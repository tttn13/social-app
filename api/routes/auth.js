const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middleware/generateToken");
require("dotenv").config();
                                                                                                                                       
let refreshTokens = [];

//Register new user
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  //simple validation
  if (!username || !email || !password) {
    return res.status(400).json({ msg: "Must enter all fields" });
  }

  try {
    //check for existing user
    const existingUser = await User.findOne({ email: email });
    if (existingUser) throw Error("User already exists");

    //create new user
    //generate new password
    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error("Something went wrong with bcrypt");

    const hashedPassword = await bcrypt.hash(password, salt);
    if (!hashedPassword)
      throw Error("Something went wrong hashing the password");

    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });
    //save user and return response
    const savedUser = await newUser.save();
    if (!savedUser) throw Error("Something went wrong saving the user");

    const token = generateAccessToken(savedUser._id);
    res.status(200).json({
      token,
      user: {
        username: savedUser.username,
        email: savedUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  //check for existing user
  const user = await User.findOne({ email: email });
  !user && res.status(404).send("User does not exist");

  //validate password
  try {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error("Invalid credentials");
  } catch (err) {
    const response = {
      msg: "Can't compare password: " + err.message,
      error: err,
    };
    return res.status(500).json(response);
  }

  const token = generateAccessToken(user._id);
  if (!token) throw Error("Couldn't sign the token");

  const refToken = generateRefreshToken(user._id);
  refreshTokens.push(String(refToken));

  return res.status(200).send({
    token: token,
    refreshToken: refToken,
    user: user,
  });
});

//log out
router.post("/logout", async (req, res) => {
  try {
    console.log("logging out on back end")
    refreshTokens = []
    res.status(200).send({ msg: "You logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//refresh
router.post("/refresh", async (req, res) => {
  //take refresh token from user
  const { refreshToken } = req.body;
  console.log("refreshTokens",refreshTokens, "and refresh token is", refreshToken)

  //send error if there's no token or token invalid
  if (!refreshToken)
    return res.status(403).json({ message: "Refresh Token is required!" });
  if (!refreshTokens.includes(String(refreshToken))) {
    return res.status(403).json("Refresh token doesn't exist!");
  }
  try {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, user) => {
        if (err) {
          console.log("this is error when verifying refresh Token");
          return res.status(401).send({ 
            message: "Unauthorized! Access Token is expired!", 
            error: err });
        }

        // refreshTokens = refreshTokens.filter((token) => String(token) !== String(refreshToken));
        // const newRefreshToken = generateRefreshToken(user._id);
        // refreshTokens.push(newRefreshToken);
        const newAccessToken = generateAccessToken(user._id);

        return res.status(200).json({
          token: newAccessToken,
          refreshToken: refreshToken,
        });
      }
    );
  } catch (error) {
    return res.status(500).send({ message: error, failed: "this failed completely" });
  }
});

module.exports = router;
