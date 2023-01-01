const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth.js');
const review = require('../../db/models/review');

const {
  Spot,
  Review,
  ReviewImage,
  User,
  SpotImage,
  Booking,
  sequelize,
} = require('../../db/models');

//🔴 Delete a Review Image
router.delete('/:imageId', requireAuth, async (req, res) => {
  let { imageId } = req.params;
  imageId = parseInt(imageId);
  const reviewImageToDelete = await ReviewImage.findOne({
    where: {
      id: imageId,
    },
    include: [
      {
        model: Review,
      },
    ],
  });

  if (!reviewImageToDelete) {
    res.status(404);
    res.json({
      message: "Review Image couldn't be found",
      statusCode: 404,
    });
  }
  const userId = reviewImageToDelete.Review.userId;
  const sessionUserId = req.user.id;
  if (userId !== sessionUserId) {
    const err = new Error('Forbidden');
    err.error = 'Forbidden';
    err.status = 403;
    res.status(403);
    res.json(err);
  }

  if (userId === sessionUserId && reviewImageToDelete) {
    await reviewImageToDelete.destroy();
    res.status(200);
    res.json({
      statusCode: 200,
      message: 'Successfully deleted',
    });
  }
});

module.exports = router;
