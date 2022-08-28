const express = require("express");
const router = express.Router({ mergeParams: true });
const { signUpNewUser } = require("../controllers/user.controller");

router.route("/").post(signUpNewUser);

module.exports = router;
