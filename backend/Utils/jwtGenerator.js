const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(user_id) {
  //create payload
  const payload = {
    user: {
      id: user_id,
    },
  };

  // return the signature with the payload, and secret key
  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "365d" });
}

module.exports = jwtGenerator;
