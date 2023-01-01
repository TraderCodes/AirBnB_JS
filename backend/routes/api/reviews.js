const express = require('express');
const router = express.Router();

const {
  User,
  Review,
  Spot,
  ReviewImage,
  sequelize,
  SpotImage,
} = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const { check } = require('express-validator');
const review = require('../../db/models/review');
const { handleValidationErrors } = require('../../utils/validation');

// 🔴 Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res) => {
  const userId = req.user.id;
  const reviews = await Review.findAll({
    where: {
      userId,
    },
    include: [
      {
        model: Spot,
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'description'],
        },
        include: [
          {
            model: SpotImage,
          },
        ],
      },
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

  let finalList = [];
  // console.log(finalList)
  reviews.forEach((singleReview) => {
    finalList.push(singleReview.toJSON());
  });

  finalList.forEach((review) => {
    review.Spot.SpotImages.forEach((image) => {
      if (image.preview === true) {
        review.Spot.previewImage = image.url;
      }
    });
    if (!review.Spot.previewImage) {
      review.Spot.previewImage = 'no image found';
    }
    delete review.Spot.SpotImages;
  });

  res.json(finalList);
});
module.exports = router;
