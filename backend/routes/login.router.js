const express = require("express");
const router = express.Router({ mergeParams: true });
const { verifyUserCredentials } = require("../controllers/login.controller");

router.route("/").post(verifyUserCredentials);

module.exports = router;
