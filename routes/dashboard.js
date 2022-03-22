const express = require("express");
const router = express.Router();

const getDashboard = require("../controllers/dashboard").getDashboard;
const checkToken = require("../controllers/middleware").checkToken;
const verifyToken = require("../controllers/middleware").verifyToken;

router.route("/dashboard", checkToken, getDashboard);

module.exports = router;
