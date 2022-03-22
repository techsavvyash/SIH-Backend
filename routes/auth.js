const expres = require("express");
const router = expres.Router();

const login = require("../controllers/auth").login;
const signup = require("../controllers/auth").signup;

router.route("/login").post(login);
router.route("/signup").post(signup);

module.exports = router;
