const express = require("express");
const { requireSignIn, userMiddleware } = require("../common-middleware/index");
const {
  addItemToCart,
  getCartItems,
  removeCartItems,
} = require("../controller/cart");
const router = express.Router();

router.post(
  "/user/cart/addtocart",
  requireSignIn,
  userMiddleware,
  addItemToCart
);
router.post("/user/getCartItems", requireSignIn, userMiddleware, getCartItems);
router.post(
  "/user/cart/removeCartItem",
  requireSignIn,
  userMiddleware,
  removeCartItems
);

// router.get('/category/get', getAllCategory);

module.exports = router;
