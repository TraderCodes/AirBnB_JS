const express = require('express');
const router = express.Router();
const {
  Review,
  Spot,
  ReviewImage,
  User,
  SpotImage,
  sequelize,
  Booking,
} = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');
const spot = require('../../db/models/spot');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateReviews = [
  check('stars')
    .exists({ checkFalsy: true })
    .isInt({ min: 1, max: 5 })
    .withMessage('Stars must be an integer from 1 to 5.'),
  check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required.'),
  handleValidationErrors,
];
const validateSpot = [
  check('address').notEmpty().withMessage('Street address is required'),
  check('country').notEmpty().withMessage('Country is required'),
  check('state').notEmpty().withMessage('State is required'),
  check('city').notEmpty().withMessage('City is required'),
  // check('lat', 'Latitude is not valid')
  //   .notEmpty()
  //   .bail()
  //   .isDecimal()
  //   .withMessage('Latitude is not valid'),
  // check('lng', 'Longitude is not valid')
  //   .notEmpty()
  //   .bail()
  //   .isDecimal()
  //   .withMessage('Longitude is not valid'),
  check('name')
    // .notEmpty()
    .isLength({ min: 1, max: 50 })
    .withMessage('Name must be more than 1 and less than 50 characters'),
  check('price').notEmpty().withMessage('Price per day is required'),
  check('description').notEmpty().withMessage('Description is required'),
  handleValidationErrors,
];

const validateQuerySpot = [
  check('page')
    .isInt({ min: 1, max: 10 })
    .optional({ nullable: true })
    .withMessage(
      'Page must be greater than or equal to 1 and less or equal to 10'
    ),
  check('size')
    .isInt({ min: 1, max: 20 })
    .optional({ nullable: true })
    .withMessage(
      'Size must be greater than or equal to 1 and less or equal to 20'
    ),
  check('minLat')
    .optional()
    .isDecimal()
    .withMessage('Minimum latitude is invalid'),
  check('maxLat')
    .optional()
    .isDecimal()
    .withMessage('Maximum latitude is invalid'),
  check('minLng')
    .optional()
    .isDecimal()
    .withMessage('Minimum longitude is invalid'),
  check('maxLng')
    .optional()
    .isDecimal()
    .withMessage('Maximum longitude is invalid'),
  check('minPrice')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Minimum price must be greater than or equal to 0'),
  check('maxPrice')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Maximum price must be greater than or equal to 0'),
  handleValidationErrors,
];
// 🔴 GET ALL SPOTS
router.get('/', validateQuerySpot, async (req, res, next) => {
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } =
    req.query;
  page = Number(page);
  size = Number(size);

  if (Number.isNaN(page)) page = 1;
  if (Number.isNaN(size)) size = 20;
  if (page > 10) page = 10;
  if (size > 20) size = 20;

  let pagination = {};
  if (parseInt(page) >= 1 && parseInt(size) >= 1) {
    pagination.limit = size;
    pagination.offset = size * (page - 1);
  }

  const querySpot = {
    where: {},
    include: [
      {
        model: Review,
        attributes: ['stars'],
      },
      {
        model: SpotImage,
        attributes: ['url', 'preview'],
      },
    ],
    ...pagination,
  };

  if (!maxLng && minLng) {
    querySpot.where.lng = {
      [Op.gte]: minLng,
    };
  }
  if (maxLat && minLat) {
    querySpot.where.lat = {
      [Op.and]: {
        [Op.lte]: maxLat,
        [Op.gte]: minLat,
      },
    };
  }

  if (maxLng && !minLng) {
    querySpot.where.lng = {
      [Op.lte]: maxLng,
    };
  }
  if (maxPrice && !minPrice) {
    querySpot.where.price = {
      [Op.lte]: maxPrice,
    };
  }

  if (!maxPrice && minPrice) {
    querySpot.where.price = {
      [Op.gte]: minPrice,
    };
  }

  if (maxPrice && minPrice) {
    querySpot.where.price = {
      [Op.and]: {
        [Op.lte]: maxPrice,
        [Op.gte]: minPrice,
      },
    };
  }

  if (maxLng && minLng) {
    querySpot.where.lng = {
      [Op.and]: {
        [Op.lte]: maxLng,
        [Op.gte]: minLng,
      },
    };
  }
  if (maxLat && !minLat) {
    querySpot.where.lat = {
      [Op.lte]: maxLat,
    };
  }

  if (!maxLat && minLat) {
    querySpot.where.lat = {
      [Op.gte]: minLat,
    };
  }

  let spots = await Spot.findAll(querySpot);
  let arr = [];

  spots.forEach((spot) => {
    let eachSpot = spot.toJSON();

    let count = spot.Reviews.length;
    let sum = 0;
    spot.Reviews.forEach((review) => (sum += review.stars));
    let avg = sum / count;
    if (!avg) {
      avg = 'No ratings';
    }
    eachSpot.avgRating = avg;

    if (eachSpot.SpotImages.length > 0) {
      for (let i = 0; i < eachSpot.SpotImages.length; i++) {
        if (eachSpot.SpotImages[i].preview === true) {
          eachSpot.previewImage = eachSpot.SpotImages[i].url;
        }
      }
    }

    if (!eachSpot.previewImage) {
      eachSpot.previewImage = 'No preview image';
    }
    delete eachSpot.Reviews;
    delete eachSpot.SpotImages;
    arr.push(eachSpot);
  });

  res.json({
    Spots: arr,
    page: page,
    size: size,
  });
});

// 🔴 Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res, next) => {
  let currentUser = req.user;
  let getallSpots = await currentUser.getSpots({
    include: [
      {
        model: Review,
        // attributes: ['stars'],
      },
      {
        model: SpotImage,
        // attributes: ['url', 'preview'],
      },
    ],
  });

  const spots = [];
  getallSpots.forEach((spot) => {
    spots.push(spot.toJSON());
  });

  spots.forEach((spot) => {
    spot.SpotImages.forEach((spotImage) => {
      if (spotImage.url) {
        spot.previewImage = spotImage.url;
      }
    });
    let count = 0;
    let i = 0;
    spot.Reviews.forEach((review) => {
      i++;
      count = count + review.stars;
    });
    spot.avgRating = count / i;
    delete spot.Reviews;
    delete spot.SpotImages;
  });

  if (spots.length === 0) {
    res.json("Sorry, you don't own any spots");
  }

  return res.json({
    spots,
  });
});

// 🔴Get details for a Spot from an id
router.get('/:spotId', async (req, res, next) => {
  let { spotId } = req.params;
  let spot = await Spot.findByPk(spotId);
  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  spot = spot.toJSON();

  let count = await Review.count({
    where: {
      spotId: spotId,
    },
  });
  spot.numReviews = count;
  let sum = await Review.sum('stars', {
    where: {
      spotId: spotId,
    },
  });

  if (sum / count) {
    spot.avgStarRating = sum / count;
  } else {
    spot.avgStarRating = 'No ratings';
  }
  let spotImages = await SpotImage.findAll({
    where: {
      spotId: spotId,
    },
    attributes: ['id', 'url', 'preview'],
  });

  // Add image into spot
  if (spotImages.length > 0) {
    spot.SpotImages = spotImages;
  } else {
    spot.SpotImages = 'No images';
  }
  // Owner section
  spot.Owner = await User.findByPk(spot.ownerId, {
    attributes: ['id', 'firstName', 'lastName'],
  });

  return res.json(spot);
});

// 🔴 Create spot
router.post('/', requireAuth, validateSpot, async (req, res, next) => {
  // get user
  let user = req.user;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  let addSpot = await Spot.create({
    ownerId: user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });

  res.status(201);
  return res.json(addSpot);
});

// 🔴 Edit a Spot

router.put('/:spotId', requireAuth, validateSpot, async (req, res) => {
  let { spotId } = req.params;
  spotId = parseInt(spotId);
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const spotToUpdate = await Spot.findOne({
    where: {
      id: spotId,
    },
  });

  if (!spotToUpdate) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  //Find spot ownerId
  const ownerId = spotToUpdate.ownerId;

  if (ownerId !== req.user.id) {
    const err = new Error('Forbidden');
    err.status = 403;
    err.error = 'Forbidden';
    res.status(403);
    res.json(err);
  }

  if (spotToUpdate && ownerId === req.user.id) {
    spotToUpdate.update({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    });
    return res.json(spotToUpdate);
  }
});

// 🔴 Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
  let { spotId } = req.params;
  let { url, preview } = req.body;

  const spot = await Spot.findOne({
    where: {
      id: spotId,
    },
  });
  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  //find owner id
  const ownerId = spot.ownerId;
  if (ownerId !== req.user.id) {
    const err = new Error('Forbidden');
    err.status = 403;
    err.error = 'Forbidden';
    res.status(403);
    res.json(err);
  }

  if (ownerId == req.user.id && spot) {
    const newImage = await SpotImage.create({
      url,
      preview,
      spotId,
    });
    const newImageId = newImage.id;
    const finalAdd = await SpotImage.findOne({
      where: {
        id: newImageId,
      },
      attributes: ['id', 'url', 'preview'],
    });
    return res.json(finalAdd);
  }
});

//😡 Create a review for spot based on spot's Id

router.post(
  '/:spotId/reviews',
  requireAuth,
  validateReviews,
  async (req, res) => {
    const { review, stars } = req.body;
    let { spotId } = req.params;
    spotId = parseInt(spotId);
    const sessionUserId = req.user.id;
    const reviewToCreate = await Review.findAll({
      where: {
        spotId,
      },
    });
    const spotToCreate = await Spot.findOne({
      where: {
        id: spotId,
      },
    });

    for (let review of reviewToCreate) {
      // user can't not have more than one review
      if (review.userId === sessionUserId) {
        const err = new Error('User already has a review for this spot');
        err.error = 'User already has a review for this spot';
        err.status = 403;
        res.status(403);
      return  res.json(err);
      }
    }

    if (spotToCreate) {
      const createReview = await Review.create({
        spotId,
        userId: sessionUserId,
        review,
        stars,
      });
      res.status(201);
      return res.json(createReview);
    } else {
      res.status(404);
      return res.json({
        message: "Couldn't find a Spot with the specified id",
        statusCode: 404,
      });
    }
  }
);
//😡 Get all Reviews by a Spot's id

router.get('/:spotId/reviews', async (req, res) => {
  let { spotId } = req.params;
  spotId = parseInt(spotId);

  const reviews = await Review.findAll({
    where: {
      spotId,
    },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName'],
      },
      {
        model: ReviewImage,
        attributes: ['id', 'url'],
      },
    ],
  });

  if (reviews.length !== 0) {
    return res.json({ Reviews: reviews });
  } else if (reviews.length === 0) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
});

//❤ Get all Bookings with spot ID
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
  const { spotId } = req.params;
  const user = req.user;

  const spot = await Spot.findByPk(spotId);
  const ownerBookings = await Booking.findOne({
    where: {
      spotId,
    },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName'],
      },
    ],
  });
  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  let bookings = await spot.getBookings({
    include: {
      model: User,
      attributes: ['id', 'firstName', 'lastName'],
    },
  });

  const bookList = [];
  bookings.forEach((booking) => {
    booking = booking.toJSON();
    // console.log(booking)
    if (user.id !== spot.ownerId) {
      let singleBooking = {
        spotId: booking.spotId,
        startDate: booking.startDate,
        endDate: booking.endDate,
      };
      bookList.push(singleBooking);
    } else {
      let singleBooking = {
        User: booking.User,
        spotId: booking.spotId,
        userId: booking.userId,
        startDate: booking.startDate,
        endDate: booking.endDate,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
      };
      bookList.push(singleBooking);
    }
  });

  return res.json({
    Bookings: bookList,
  });
});

//🏮 create spot bookings
router.post('/:id/bookings', requireAuth, async (req, res) => {
  const spotId = Number(req.params.id);
  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  // if is the owner of the spot
  const userId = req.user.id;
  const spotOwner = spot.dataValues.ownerId;

  if (spotOwner === userId) {
    res.status(403);
    return res.json({
      message: 'Forbidden',
      statusCode: 403,
    });
  }
  // check if user enter date or not
  let { startDate, endDate } = req.body;
  const errors = [];
  if (!startDate) errors.push('Need a Start Date');
  if (!endDate) errors.push('Need a End Date');
  if (errors.length) {
    res.status(400);
    return res.json({
      message: 'Validation Error',
      statusCode: 400,
      errors,
    });
  }

  // compare the dates
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  if (endDate <= startDate)
    errors.push('endDate cannot be on or before startDate');
  if (errors.length) {
    res.status(400);
    return res.json({
      message: 'Validation Error',
      statusCode: 400,
      errors,
    });
  }
  const allBookings = await Booking.findAll({
    where: {
      spotId: spotId,
    },
  });
  for (booking of allBookings) {
    const errorB = [];
    // request entry date
    const ed = booking.dataValues.endDate;
    const sd = booking.dataValues.startDate;
    if (ed >= startDate && ed <= endDate)
      errorB.push('End date conflicts with an existing booking');
    if (sd >= startDate && sd <= endDate)
      errorB.push('Start date conflicts with an existing booking');
    if (errorB.length) {
      res.status(403);
      return res.json({
        message: 'Sorry, this spot is already booked for the specified dates',
        statusCode: 403,
        errors: errorB,
      });
    }
  }
  const createBooking = await Booking.create({
    userId,
    spotId,
    startDate,
    endDate,
  });

  return res.json(createBooking);
});
// 🔴 Delete spot
router.delete('/:spotId', requireAuth, async (req, res) => {
  let { spotId } = req.params;
  spotId = parseInt(spotId);
  const spotToDelete = await Spot.findOne({
    where: {
      id: spotId,
    },
  });
  if (!spotToDelete) {
    const err = new Error("Spot couldn't be found");
    err.error = "Spot couldn't be found";
    err.status = 404;
    res.status(404);
    res.json(err);
  }
  // Find session(currentID) @ Spot that wants to be deleted ID
  // And compare
  const spotToDeleteId_ = spotToDelete.ownerId;
  const currentSessionId = req.user.id;

  if (spotToDeleteId_ !== currentSessionId) {
    // response if not that user
    const err = new Error('Forbidden');
    err.status = 403;
    err.error = 'Forbidden';
    res.status(403);
    res.json(err);
  } else if (spotToDeleteId_ === currentSessionId) {
    // Delete if is the user
    await spotToDelete.destroy();
    res.status(200);
    return res.json({
      message: 'Successfully deleted',
      statusCode: 200,
    });
  }
});

module.exports = router;
