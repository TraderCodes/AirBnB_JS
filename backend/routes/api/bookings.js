const express = require('express');
const router = express.Router();

const {
  Spot,
  Review,
  ReviewImage,
  User,
  SpotImage,
  Booking,
  sequelize,
} = require('../../db/models');
const { requireAuth } = require('../../utils/auth');



// ❤ Get all bookings from current user
router.get('/current', requireAuth, async (req, res) => {
  let sessionUserId = req.user.id;
  sessionUserId = parseInt(sessionUserId);
  const bookings = await Booking.findAll({
    where: {
      userId: sessionUserId,
    },
    include: [
      {
        include: [{ model: SpotImage }],
        model: Spot,
        attributes: { exclude: ['updatedAt', 'createdAt', 'description'] },
      },
    ],
  });

  const allBookings = [];
  bookings.forEach((booking) => {
    console.log(booking);
    allBookings.push(booking.toJSON());
  });

  allBookings.forEach((booking) => {
    booking.Spot.SpotImages.forEach((image) => {
      if (image.preview === true) {
        booking.Spot.previewImage = image.url;
      }
    });

    // check if preview image exist
    if (!booking.Spot.previewImage) {
      booking.Spot.previewImage = 'No preview image';
    }
    delete booking.Spot.SpotImages;
  });

  return res.json({
    Bookings: allBookings,
  });
});

module.exports = router;
