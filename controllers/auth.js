const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");

router.get("/sign-up", (req, res) => {
    res.render("auth/sign-up.ejs");
  });  

  router.post("/sign-up", async (req, res) => {

    // check to see if user exist
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
    //if yes reject
    return res.send("Username already taken.");
}


// password
if (req.body.password !== req.body.confirmPassword) {
    return res.send("Password and Confirm Password must match");
  }

  //hash the password
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
req.body.password = hashedPassword;

  
const user = await User.create(req.body);

    res.send("Form submission accepted!");
  });
  
module.exports = router;
