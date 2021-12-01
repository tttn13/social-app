const jwt = require("jsonwebtoken");
require("dotenv").config();


const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.jwtExpiration,
  });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.jwtRefreshExpiration,
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
