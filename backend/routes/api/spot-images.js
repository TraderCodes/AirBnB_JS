const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage } = require('../../db/models');

const sequelize = require('sequelize');

router.delete('/:imageId', requireAuth, async (req, res) => {
  let { imageId } = req.params;
  imageId = parseInt(imageId);
  const imageToDelete = await SpotImage.findOne({
    where: {
      id: imageId,
    },
  });

  if (!imageToDelete) {
    res.status(404);
    res.json({
      message: "Spot Image couldn't be found",
      statusCode: 404,
    });
  }
  const userId = imageToDelete.spotId;
  const sessionUserId = req.user.id;
  const theSpot = await Spot.findOne({
    where: {
      id: userId,
    },
  });

  const ownerId = theSpot.id;

  if (sessionUserId !== userId) {
    const err = new Error('Forbidden');
    err.status = 403;
    err.error = 'Forbidden';
    res.status(403);
    return res.json(err);
  }

  if (imageToDelete && sessionUserId === ownerId) {
    await imageToDelete.destroy();
    res.status(200);
    return res.json({
      statusCode: 200,
      message: 'Successfully deleted',
    });
  }
});
module.exports = router;
