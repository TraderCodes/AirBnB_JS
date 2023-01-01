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

//🚗Delete Booking
const convertDate = (date) => {
  const [year, month, day] = date.split('-');
  const monthIndex = month - 1;
  const newDate = new Date(year, monthIndex, date);
  return date;
};
router.delete('/:bookingId', requireAuth, async (req, res, next) => {
  const { bookingId } = req.params;
  const user = req.user;
  const currentBooking = await Booking.findOne({
    where: {
      id: bookingId,
    },
  });
  if (!currentBooking) {
    res.status(404);
    return res.json({
      message: "Booking couldn't be found",
      statusCode: 404,
    });
  }
  let spot = await booking.getSpot();
  let booking = await Booking.findByPk(bookingId);

  let err = {};
  if (user.id !== booking.userId && user.id !== spot.ownerId) {
    err.title = 'Authorization error';
    err.status = 403;
    err.message = "Booking doesn't belong to current user";
    return next(err);
  }

  const startDate = convertDate(booking.startDate);

  if (startDate <= new Date()) {
    res.status(403);
    return res.json({
      message: "Bookings that have started can't be deleted",
      statusCode: 403,
    });
  }
  booking.destroy();
  return res.json({
    message: 'Successfully deleted',
    statusCode: 200,
  });
});

module.exports = router;
