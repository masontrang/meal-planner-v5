const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
// const createError = require('http-errors');

const protect = asyncHandler(async (req, res, next) => {
  // console.log('cookies', req.headers.cookie);
  const { access_token } = req.cookies;
  // console.log('token', access_token);

  if (!access_token) {
    res.status(401);
    // throw new Error('Not authorized - no token.');
    return res.status(401).json({
      message: 'Not Authorized. No Token',
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(access_token, process.env.JWT_SECRET);
    // console.log('decoded', decoded);

    // Get user from token
    req.user = await User.findById(decoded.id)
      .select('-password')
      .populate('group');

    next();
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized.');
  }
});

module.exports = { protect };
