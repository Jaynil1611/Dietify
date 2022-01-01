const express = require("express");
const router = express.Router({ mergeParams: true });
const { cartParamHandler } = require("../middlewares/paramHandlers");
const {
  getCartList,
  postCartList,
  getCartItem,
  updateCartItem,
  deleteCartItem,
  clearCart,
} = require("../controllers/cart.controller");

router
  .route("/")
  .get(getCartList)
  .post(postCartList)
  .delete(clearCart);

router.param("productId", cartParamHandler);

router
  .route("/:productId")
  .get(getCartItem)
  .post(updateCartItem)
  .delete(deleteCartItem);

module.exports = router;
