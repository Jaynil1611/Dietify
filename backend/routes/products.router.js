const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProduct,
} = require("../controllers/product.controller");
const { productParamHandler } = require("../middlewares/paramHandlers");

router.route("/").get(getProducts);

router.param("productId", productParamHandler);

router.route("/:productId").get(getProduct);

module.exports = router;
