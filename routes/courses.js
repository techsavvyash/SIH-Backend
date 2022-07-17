const express = require("express");
const router = express.Router();

const postCourses = require("../controllers/course").postCourses;
const getCourses = require("../controllers/course").getCourses;

router.route("/course").get(getCourses);
router.route("/course").post(postCourses);

module.exports = router;
