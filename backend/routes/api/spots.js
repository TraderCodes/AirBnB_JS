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
  res.json({
    Spots,
  });
});

// 🔴 Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res, next) => {
  let currentUser= req.user;
  let getallSpots = await currentUser.getSpots({
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

  if (Spots.length === 0) {
    res.json("Sorry, you don't own any spots");
  }

  res.json({
    Spots,
  });
});

module.exports = router;
