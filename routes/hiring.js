const express = require("express");
const { postHiringRequest } = require("../controllers/hiring");
const router = express.Router();

const updateHiringRequest =
  require("../controllers/hiring").updateHiringRequest;

router.route("/hiring").post(postHiringRequest);
router.route("/hiringreq").post(updateHiringRequest);

module.exports = router;
