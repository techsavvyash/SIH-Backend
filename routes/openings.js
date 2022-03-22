const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();

const getOpenings = require("../controllers/openings").getOpenings;
const postOpenings = require("../controllers/openings").postOpenings;

router.route("/openings").get(getOpenings);
router.route("/openings").post(postOpenings);

module.exports = router;
