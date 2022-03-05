const express = require("express");
const app = express.Router();
const path = require("path");

const bcrpyt = require("bcryptjs");
const {
  signUpValidation,
  loginValidation,
} = require("../../users/models/user.validate");

const appDir = path.join(__dirname, "../../public");
const User = require("../../users/models/user.schema");

app.get("/sign-in", (req, res) => {
  res.sendFile(appDir + "/html/signup.html");
});

app.post("/signin", async (req, res) => {
  const { error } = signUpValidation.validate(req.body);
  if (error) {
    return res.status(400).send({ status: 0, message: error.details });
  }

  /* Check if email exists */
  let emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res
      .status(400)
      .send({ status: false, message: "Email already exists" });

  /* Hash Password */
  let salt = await bcrpyt.genSalt(10);
  let hashedPassword = await bcrpyt.hash(req.body.password, salt);

  /* Create a new User*/

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  let savedUser = await newUser.save();
  if (!savedUser) {
    return res.status(400).send({ status: false, message: savedUser });
  } else {
    return res.status(200).send({ status: true, message: "Success" });
  }
});

app.post("/login", async (req, res) => {
  let { error } = await loginValidation.validate(req.body);
  if (error)
    return res
      .status(400)
      .send({ ok: false, message: error.details[0].message });

  /* Verify Data */
  let loggedInUser = await User.findOne({ email: req.body.email });
  if (!loggedInUser) {
    return res.status(400).send({
      ok: false,
      message: "Email or username could not be found.",
    });
  }

  let checkPass = await bcrpyt.compare(
    req.body.password,
    loggedInUser.password
  );

  if (!checkPass) {
    return res.status(400).send({
      ok: false,
      message: "Incorrect Password",
    });
  }

  return res.status(200).send({
    ok: true,
    message: "Logged In",
  });
});

module.exports = app;
