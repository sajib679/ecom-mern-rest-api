const express = require("express");
const {
  requireSignIn,
  adminMiddleware,
  upload,
} = require("../common-middleware/index");
const {
  addProduct,
  getProductBySlug,
  getProductById,
  searchProduct,
  updateProduct,
  deleteProductImage,
} = require("../controller/product");
const router = express.Router();

router.post(
  "/product/create",
  requireSignIn,
  adminMiddleware,
  upload.array("productPicture"),
  addProduct
);

router.post(
  "/product/update",
  requireSignIn,
  adminMiddleware,
  upload.array("productPicture"),
  updateProduct
);

router.patch(
  "/product/update",
  requireSignIn,
  adminMiddleware,
  deleteProductImage
);

router.get("/product/:slug", getProductBySlug);
router.get("/p/product/:productId", getProductById);
router.get("/search/:searchTerm", searchProduct);

module.exports = router;
