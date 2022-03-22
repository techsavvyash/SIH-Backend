const express = require("express");
const router = express.Router();

const getStudentInterviews =
  require("../controllers/interview").getStudentInterviews;
const getCompanyInterviews =
  require("../controllers/interview").getCompanyInterviews;
const postStudentInterviews =
  require("../controllers/interview").postStudentInterviews;

router.route("/interview/student").get(getStudentInterviews);
router.route("/interview/company").get(getCompanyInterviews);
router.route("/interview/student").post(getCompanyInterviews);

module.exports = router;
