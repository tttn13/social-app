const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateAccessToken } = require('../middleware/generateToken');
require('dotenv').config();

// Register new user
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // simple validation
  if (!username || !email || !password) {
    return res.status(400).json({ msg: 'Must enter all fields' });
  }

  try {
    // check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) throw Error('User already exists');

    // create new user
    // generate new password
    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error('Something went wrong with bcrypt');

    const hashedPassword = await bcrypt.hash(password, salt);
    if (!hashedPassword) throw Error('Something went wrong hashing the password');

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    // save user and return response
    const savedUser = await newUser.save();
    if (!savedUser) throw Error('Something went wrong saving the user');

    const generatedToken = generateAccessToken(savedUser._id);
    res.status(200).json({
      token: generatedToken,
      user: {
        username: savedUser.username,
        email: savedUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  // simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // check for existing user
  const user = await User.findOne({ email });
  !user && res.status(404).send('User does not exist');

  // validate password
  try {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error('Invalid credentials');
  } catch (err) {
    const response = {
      msg: `Can't compare password: ${err.message}`,
      error: err,
    };
    return res.status(500).json(response);
  }

  const token = generateAccessToken(user._id);
  if (!token) throw Error("Couldn't sign the token");

  return res.status(200).send({
    token,
    user,
  });
});

// log out
router.post('/logout', async (req, res) => {
  try {
    console.log('logging out on back end');
    res.status(200).send({ msg: 'You logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
