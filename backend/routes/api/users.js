const express = require('express');
const router = express.Router();

const { User } = require('../../db/models');
const { check } = require('express-validator');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const {
  handleValidationErrors,
  handleDuplicateErrors,
} = require('../../utils/validation');
// validation middleware for Sign up
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    // .isEmail()
    .withMessage('Invalid email.'),
  check('username')
    .exists({ checkFalsy: true })
    // .isLength({ min: 4 })
    .withMessage('Username is required.'),
  check('username').not().isEmail().withMessage('Username is required'),
  // check('password')
  //   .exists({ checkFalsy: true })
  //   .isLength({ min: 6 })
  //   .withMessage('Password must be 6 characters or more.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required'),
  handleValidationErrors,
];

router.post('/' , validateSignup, async (req, res) => {
  const { email, password, username, firstName, lastName } = req.body;
  // console.log(req.body.email)
  const allUsers = await User.findAll();
  for (let user of allUsers) {
    // console.log(user.dataValues)
    if (email === user.dataValues.email) {
        res.status(403);
        return res.json({
          message: 'User already exists',
          statusCode: 403,
          errors: ['User with that email already exists'],
        });
      }
    if (username === user.dataValues.username) {
      res.status(403);
      return res.json({
        message: 'User already exists',
        statusCode: 403,
        errors: ['User with that username already exists'],
      });
    }
  }
  const user = await User.signup({
    email,
    username,
    password,
    firstName,
    lastName,
  });
  await setTokenCookie(res, user);
  let token = await setTokenCookie(res, user);
  return res.json({
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      token: token,
    },
  });
});
module.exports = router;
