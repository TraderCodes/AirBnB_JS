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
const {
  requireAuth,
  setTokenCookie,
  restoreUser,
} = require('../../utils/auth');

const { check } = require('express-validator');
const review = require('../../db/models/review');
const { handleValidationErrors } = require('../../utils/validation');
module.exports = router;
