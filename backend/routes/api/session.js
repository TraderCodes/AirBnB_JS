const express = require('express');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');

const router = express.Router();
// middleware
const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    // .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors,
];
router.get('/', restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    return res.json({
      user: user.toSafeObject(),
    });
  } else return res.json({ user: null });
});

// api/session / LOG IN
router.post('/', validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;

  if (!credential && !password) {
    const err = new Error('Validation error');
    err.status = 400;
    err.title = 'Validation error';
    err.errors = ['Email or username is required', 'Password is required'];
    return next(err);
  }
  const user = await User.login({ credential, password });
  // check if user have password and email
  if (!user) {
    const err = new Error("Invalid credentials");
    err.status = 401;
    err.title = 'Login failed';
    err.errors = ['The provided credentials were invalid.'];
    return next(err);
  }

  await setTokenCookie(res, user);
  let token = await setTokenCookie(res, user);

  // user.token = token;
  // return res.json(user.toSafeObject());
  return res.json({
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      // token: token,
    },
  });
});
router.delete('/', (_req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'success' });
});
module.exports = router;
