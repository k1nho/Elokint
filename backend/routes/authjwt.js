const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const validInfo = require("../middleware/validateFields");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");

// Handle register
router.post("/register", validInfo, async (req, res) => {
  //get the data from the frontend
  const { email, username, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    // check if an user has been registered with the same email in the past
    if (user.rows.length > 0) {
      return res
        .status(401)
        .json("The email you are trying to use is already taken. Try again!");
    }

    // generate the passsword
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // if the user does not exists, then we insert it into the database
    let newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, bcryptPassword]
    );

    // we call the jwt token generator to be able to set the authorization
    const jwtToken = jwtGenerator(newUser.rows[0].user_id);

    // return the token to the client
    return res.json({ jwtToken });
  } catch (err) {
    // we could not handle the request send a 500 error
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/login", validInfo, async (req, res) => {
  //get the data from the frontend
  const { email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    //
    if (user.rows.length === 0) {
      return res
        .status(401)
        .json("No user with the provided email exists. Try again!");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }
    const jwtToken = jwtGenerator(user.rows[0].user_id);
    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/verify", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
