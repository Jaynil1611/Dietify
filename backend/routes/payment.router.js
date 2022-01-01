const express = require("express");
const router = express.Router({ mergeParams: true });
const { postOrder } = require("../controllers/payment.controller");

router.route("/orders").post(postOrder);

module.exports = router;
