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


//😡 Add an Image to a Review based on the Review's id

router.post('/:reviewId/images', requireAuth, async (req, res) => {
  let { reviewId } = req.params;
  const { url } = req.body;
  reviewId = parseInt(reviewId);
  const sessionUserId = req.user.id;

  const findReview = await Review.findOne({
    where: {
      id: reviewId,
    },
  });

  if (!findReview) {
    res.status(404);
    return res.json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }

  const reviewOwnerId = findReview.userId;

  if (reviewOwnerId !== sessionUserId) {
    const err = new Error('Forbidden');
    err.status = 403;
    err.error = 'Forbidden';
    res.status(403);
    res.json(err);
  }

  // Find Image amount
  const reviewImageNumber = await ReviewImage.findAll({
    where: {
      reviewId,
    },
  });

  // What to do if Image passes 10
  if (reviewImageNumber.length >= 10) {
    res.status(403);
    return res.json({
      message: 'Maximum number of images for this resource was reached',
      statusCode: 403,
    });
  }

  if (
    findReview &&
    reviewOwnerId === sessionUserId &&
    reviewImageNumber.length < 10
    ) {
      const newReviewImage = await ReviewImage.create({
        url,
        reviewId,
      });
      const newReviewId = newReviewImage.id;

      const imageReview = await ReviewImage.findOne({
        where: {
        id: newReviewId,
      },
      attributes: ['id', 'url'],
    });

    return res.json(imageReview);
  }
});

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
  console.log(finalList)
  reviews.forEach((singleReview) => {
    finalList.push(singleReview.toJSON());
  });

  finalList.forEach((review) => {
    review.Spot.SpotImages.forEach((image) => {
      if (!review.Spot.previewImage) {
        review.Spot.previewImage = 'no image found';
      }
      if (image.preview === true) {
        review.Spot.previewImage = image.url;
      }
    });
    delete review.Spot.SpotImages;
  });

  return res.json({Reviews:finalList});
});
// 😡 Edit Review
router.put('/:reviewId', requireAuth, async (req, res) => {
  let { reviewId } = req.params;
  const { review, stars } = req.body;
  reviewId = parseInt(reviewId);

  const reviewToUpdate = await Review.findOne({
    where: {
      id: reviewId,
    },
  });

  if (!reviewToUpdate) {
    res.status(404);
    return res.json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }
  // check if the person who ask for the request is the review user and do something
  const userId = reviewToUpdate.userId;

  if (userId !== req.user.id) {
    const err = new Error('Forbidden');
    err.error = 'Forbidden';
    err.status = 403;
    res.status(403);
    return res.json(err);
  }

// validation for star entry
  if (!review || stars > 5 || stars < 1) {
    res.status(400);
    return res.json({
      message: 'Validation error',
      statusCode: 400,
      errors: [
        'Review text is required',
        'Stars must be an integer from 1 to 5',
      ],
    });
  }

  await reviewToUpdate.update({
    review,
    stars,
  });

  return res.json(reviewToUpdate);
});

// 😡 Delete Review
router.delete('/:reviewId', requireAuth, async (req, res) => {

   const reviewToDelete = await Review.findByPk(req.params.reviewId, {
     where: {
       userId: req.user.id,
     },
   });
  if (!reviewToDelete) {
    res.status(404);
    return res.json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }
// find userId and compare
  const reviewUserId = reviewToDelete.userId;
  const sessionUserId = req.user.id;

  if (sessionUserId === reviewUserId && reviewToDelete) {
    await reviewToDelete.destroy();
    res.status(200);
    res.json({
      statusCode: 200,
      message: 'Successfully deleted',
    });
  }
  if (sessionUserId !== reviewUserId) {
    const err = new Error('Forbidden');
    err.error = 'Forbidden';
    err.status = 403;
    res.status(403);
    res.json(err);
  }

});

module.exports = router;
