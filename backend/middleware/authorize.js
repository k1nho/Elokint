const jwt = require("jsonwebtoken");
require("dotenv").config();

//if the token is in localStorage then the middleware will keep going

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("jwt_token");

  // Check if there is no token
  if (!token) {
    return res.status(403).json({ msg: "authorization denied" });
  }

  // Verify token
  try {
    //returns user id (user:{id: user.id})
    const verify = jwt.verify(token, process.env.jwtSecret);

    // from the verification we can obtain the user id and set it to the req.user
    req.user = verify.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
