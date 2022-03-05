const express = require("express");
const app = express.Router();
const path = require("path");

const appDir = path.join(__dirname, "../../public");

app.get("/video-call", (req, res) => {
  res.sendFile(appDir + "/html/meet.html");
});

module.exports = app;
