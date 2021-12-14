const jwt = require('jsonwebtoken');

const generateAccessToken = (userId) => jwt.sign(
  { id: userId },
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn: '1d',
  },
);

module.exports = { generateAccessToken };
