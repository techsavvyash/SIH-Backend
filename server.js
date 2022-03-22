const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const mongoose = require("mongoose");
const connectToDB = require("./config/db");

require("dotenv").config();

connectToDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CORS_URL,
    credentials: true,
  })
);
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", process.env.CORS_URL);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("crossDomain", true);
  next();
});

app.get("/", (req, res) => {
  res.send("Hey, There!").status(200);
});

app.use(require("./routes/openings"));
app.use(require("./routes/auth"));

app.listen(process.env.PORT || 5000, () => {
  console.log("http://localhost:5000");
});

module.exports = app;
