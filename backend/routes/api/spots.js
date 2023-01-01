const express = require('express');
const router = express.Router();
const {
  Review,
  Spot,
  ReviewImage,
  User,
  SpotImage,
  sequelize,
} = require('../../db/models');
const {
  setTokenCookie,
  requireAuth,
  restoreUser,
} = require('../../utils/auth');
const { Op } = require('sequelize');
const spot = require('../../db/models/spot');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const validateSpot = [
  check('address').notEmpty().withMessage('Street address is required'),
  check('country').notEmpty().withMessage('Country is required'),
  check('state').notEmpty().withMessage('State is required'),
  check('city').notEmpty().withMessage('City is required'),
  check('lat', 'Latitude is not valid')
    .notEmpty()
    .bail()
    .isDecimal()
    .withMessage('Latitude is not valid'),
  check('lng', 'Longitude is not valid')
    .notEmpty()
    .bail()
    .isDecimal()
    .withMessage('Longitude is not valid'),
  check('name')
    .notEmpty()
    .isLength({ max: 50 })
    .withMessage('Name must be less than 50 characters'),
  check('price').notEmpty().withMessage('Price per day is required'),
  check('description').notEmpty().withMessage('Description is required'),
  handleValidationErrors,
];

const validateSpotGetAll = [
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
router.get('/', validateSpotGetAll, async (req, res, next) => {
  const getallSpots = await Spot.findAll({
    include: [
      {
        model: Review,
      },
      {
        model: SpotImage,
      },
    ],
  });

  const Spots = [];
  getallSpots.forEach((spot) => {
    Spots.push(spot.toJSON());
  });

  Spots.forEach((spot) => {
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
  return res.json({
    Spots,
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