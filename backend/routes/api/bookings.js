const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const {
  Spot,
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
//🚓🚓 Edit Bookings
// router.put('/:id',requireAuth, async (req, res) => {
//   let { startDate, endDate } = req.body;
//   const err = [];
//   if (!startDate) err.push('Need a Start Date');
//   if (!endDate) err.push('Need a End Date');
//   if (err.length) {
//     res.status(400);
//     return res.json({
//       message: 'Validation Error',
//       statusCode: 400,
//       err,
//     });
//   }
//   // check date entry errors
//   startDate = new Date(startDate);
//   endDate = new Date(endDate);
//   // console.log(startDate)
//   if (endDate <= startDate)
//     err.push('endDate cannot come before startDate');
//   if (err.length) {
//     res.status(400);
//     return res.json({
//       message: 'Validation Error',
//       statusCode: 400,
//       err,
//     });
//   }
//   // check for bookings
//   const bookingId = req.params.id;
//   const bookingToEdit = await Booking.findByPk(bookingId);
//   if (!bookingToEdit) {
//     res.status(404);
//     return res.json({
//       message: "Booking couldn't be found",
//       statusCode: 404,
//     });
//   }
//   // Find is the editBook owner match the current Log in user
//   const bookOwnerId = bookingToEdit.dataValues.userId;
//   const userId = req.user.id;
//   if (bookOwnerId !== userId) {
//     res.status(403);
//     return res.json({
//       message: "Forbidden",
//       statusCode: 403,
//     });
//   }

//   const today = new Date();
//   const endDayBooking = bookingToEdit.dataValues.endDate;
//   // Check if booking is in the past
//   if (endDayBooking < today) {
//     res.status(403);
//     return res.json({
//       message: "Past bookings can't be modified",
//       statusCode: 403,
//     });
//   }
//   // booking spotId
//   const spotId = bookingToEdit.dataValues.spotId;

//   // where user id is not current users id
//   const allSpotBookings = await Booking.findAll({
//     where: {
//       [Op.and]: [{ spotId: spotId }, { id: { [Op.not]: bookingId } }],
//     },
//   });
//   console.log(allSpotBookings)

//   for (booking of allSpotBookings) {
//     const bookingErr = [];
//   console.log(booking)
//     const oldStartDate = booking.dataValues.startDate;
//     const oldEndDate = booking.dataValues.endDate;

//     if (oldEndDate >= startDate && oldEndDate <= endDate)
//     bookingErr.push('End date conflicts with an existing booking');
//     if (oldStartDate >= startDate && oldStartDate <= endDate)
//       bookingErr.push('Start date conflicts with an existing booking');
//     if (bookingErr.length) {
//       res.status(403);
//       return res.json({
//         message: 'Sorry, this spot is already booked for the specified dates',
//         statusCode: 403,
//         err: bookingErr,
//       });
//     }
//   }

//   bookingToEdit.set({
//     startDate,
//     endDate,
//   });

//   await bookingToEdit.save();
//   return res.json(bookingToEdit);
// });
router.put('/:bookingId', requireAuth, async (req, res, next) => {
  let { bookingId } = req.params;
  bookingId = parseInt(bookingId);
  const { startDate, endDate } = req.body;
  const bookingToEdit = await Booking.findOne({
    where: {
      id: bookingId,
    },
  });

  if (!bookingToEdit) {
    res.status(404);
    return res.json({
      message: "Booking couldn't be found",
      statusCode: 404,
    });
  }

  //current user must be the owner
  const userId = bookingToEdit.userId;
  const currentUserId = req.user.id;
  const spotId = bookingToEdit.spotId;

  if (userId !== currentUserId) {
    const err = new Error('Forbidden');
    err.status = 403;
    err.error = 'Forbidden';
    res.status(403);
    res.json(err);
  }
  // compare start and end date
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (start.getTime() >= end.getTime()) {
    res.status(400);

    return res.json({
      message: 'Validation error',
      statusCode: 400,
      errors: {
        endDate: 'endDate cannot come before startDate',
      },
    });
  }

  const today = Date.now();
  if (today > end.getTime()) {
    const err = new Error("Can't edit a booking that's ends before today");
    err.status = 403;
    err.error = "Past bookings can't be modified";
    res.status(403);
    return res.json(err);
  }
  const oldBooking = await Booking.findAll({
    where: {
      spotId,
    },
  });

  for (let booking of oldBooking) {
    const oldStart = booking.startDate.getTime();
    const oldEnd = booking.endDate.getTime();

    if (start.getTime() <= oldEnd && start.getTime() >= oldStart) {
      res.status(403);
      return res.json({
        message: 'Sorry, this spot is already booked for the specified dates',
        statusCode: 403,
        errors: {
          startDate: 'Start date conflicts with an existing booking',
          endDate: 'End date conflicts with an existing booking',
        },
      });
    }
    if (end.getTime() <= oldEnd && end.getTime() >= oldStart) {
      res.status(403);
      return res.json({
        message: 'Sorry, this spot is already booked for the specified dates',
        statusCode: 403,
        errors: {
          startDate: 'Start date conflicts with an existing booking',
          endDate: 'End date conflicts with an existing booking',
        },
      });
    }

  }
  if (
    start.getTime() < end.getTime() &&
    userId === currentUserId &&
    bookingToEdit &&
    today < end.getTime()
  ) {
    bookingToEdit.update({
      startDate,
      endDate,
    });

    res.json(bookingToEdit);
  }
});



//🔴 delete bookings
router.delete('/:bookingId', requireAuth, async (req, res, next) => {
  const booking = await Booking.findOne({
    where: {
      id: req.params.bookingId,
    },
  });
  if (!booking) {
    res.status(404);
    return res.json({
      message: 'Booking could not be found',
      statusCode: 404,
    });
  }
  const spot = await Spot.findOne({
    where: {
      id: booking.spotId,
    },
  });
  const today = new Date();
  const userId = req.user.id;
  const spotOwnerId = spot.ownerId;
  const bookingStartDate = new Date(booking.startDate);

  // can't edit someones booking
  if (userId !== booking.userId && userId !== spotOwnerId) {
    res.status(403);
    return res.json({
      message: 'Forbidden',
      statusCode: 403,
    });
  }
  // If booking startdate is before current date , thats means is in the pass
  else if (today.getTime() >= bookingStartDate.getTime()) {
    res.status(403);
    return res.json({
      message: "Past bookings can't be modified",
      statusCode: 403,
    });
  }
  await booking.destroy();
  return res.json({
    message: 'Successfully deleted',
    statusCode: 200,
  });
});
module.exports = router;
