const express = require('express');
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');



// sign up
router.post('/', async (req, res) => {
  const { email, password, username ,firstName, lastName } = req.body;
  const user = await User.signup({ email, username, password , firstName, lastName});

  await setTokenCookie(res, user);

  return res.json({
    user: user,
  });
});
module.exports = router;

//
// R4EdfFE7-xrBz7d4cZmqrVCOaVODIH5JMjZQ
// 1
