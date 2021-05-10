const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getWishlist,
  postWishlist,
  getWishlistItem,
  updateWishlistItem,
  deleteWishlistItem,
} = require("../controllers/wishlist.controller");
const { wishlistParamHandler } = require("../middlewares/paramHandlers");

router.param("productId", wishlistParamHandler);

router
  .route("/")
  .get(getWishlist)
  .post(postWishlist);

router
  .route("/:productId")
  .get(getWishlistItem)
  .post(updateWishlistItem)
  .delete(deleteWishlistItem);

module.exports = router;
