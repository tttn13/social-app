const jwt = require("jsonwebtoken");
require("dotenv").config();

const { TokenExpiredError } = jwt;
const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({ message: "Unauthorized! Access Token is expired!" });
  }

  return res.sendStatus(401).send({ message: "Unauthorized!" });
}

const auth = (req, res, next) => {
 
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    //check for token
    const token = authHeader.split(" ")[1];
    if (!token) return res.status(403).json({ msg: "No token provided" });

    try {
      //verify token
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return catchError(err, res)
        } 
        //add user from payload
        req.user = decoded;
        next();
      });
    } catch (error) {
      res.status(400).json({ msg: "You are not authenticated" });
    }
  } else {
    console.log("request in auth is", req.originalUrl)
    res.status(401).json({ msg: "No token provided, authorization denied" });
  }
};

module.exports = auth;
