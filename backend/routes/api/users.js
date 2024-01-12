const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    message: "GET /api/users"
  })
});

/* POST /api/users/register */
router.post('/register', async (req, res, next) => {
  // Is email/username already in use?
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }]
  });

  if (user) {
    // err if email/username already in use
    const err = new Error("Validation Error");
    err.statusCode = 400;
    const errors = {};
    if (user.email === req.body.email) {
      errors.email = "This email is already registered";
    }
    if (user.username === req.body.username) {
      errors.username = "This username is already taken";
    }
    err.errors = errors;
    return next(err);
  }

  // Create new user if email/username not taken
  const newUser = new User({
    username: req.body.username,
    email: req.body.email
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try {
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        return res.json({ user });
      }
      catch(err) {
        next(err);
      }
    })
  });
});

module.exports = router;
