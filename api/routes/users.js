const express = require('express');
const router = express.Router();
const User = require('../models/User');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const { protect } = require('../middleware/authMiddleware');

console.log('secret', process.env.JWT_SECRET);
const generateToken = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '1d',
  });

//// Users
router.get('/user', protect, async (req, res) => {
  res.json(req.user);
});

//Create New User or return message if User with same name already exists
router.post('/registerUser', async (req, res) => {
  const { user, password } = req.body;
  //check if valid
  const isValidUser = Boolean(user && user.length <= 20);
  const isValidPassword = Boolean(password && password.length >= 8);
  const allValid = isValidUser && isValidPassword;

  if (!allValid) {
    return res.status(401).json({ message: 'Invalid user name or password.' });
  }

  const findUser = await User.findOne({ user: user.toLowerCase() });
  if (findUser) {
    console.log('User name already exists');
    return res
      .status(400)
      .json({ message: 'User name already exists! Try a different name.' });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    user: user.toLowerCase(),
    password: hashPassword,
  });

  console.log('registered');
  return res
    .status(200)
    .cookie('access_token', generateToken(newUser), {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    })
    .json({
      message: 'Registered new user: ' + newUser.user + '. Login to begin!',
    });
});

router.post('/login', async (req, res) => {
  // console.log('login', req.body);
  const { user, password } = req.body;
  const isValidUser = Boolean(user && user.length <= 20);
  const isValidPassword = Boolean(password && password.length >= 8);
  const allValid = isValidUser && isValidPassword;
  if (!allValid) {
    return res.status(401).json({ message: 'Invalid user name or password.' });
  }
  const findUser = await User.findOne({ user: user });

  if (!findUser) {
    return res.status(401).json({ message: 'User/Password Failed' });
  }

  const compare = await bcrypt.compare(password, findUser.password);
  if (!compare) {
    return res.status(401).json({ message: 'User/Password Failed' });
  }

  return res
    .status(201)
    .cookie('access_token', generateToken(findUser), {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    })
    .json({ message: 'Logged in as ' + findUser.user });
});

router.post('/logout', async (req, res) => {
  res.status(202).clearCookie('access_token').json({
    message: 'Logged Out',
  });
});

module.exports = router;
