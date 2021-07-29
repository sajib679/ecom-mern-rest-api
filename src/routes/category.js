const express = require("express");
const {
  requireSignIn,
  adminMiddleware,
  upload,
} = require("../common-middleware/index");
const {
  addCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/category");
const multer = require("multer");
const router = express.Router();

router.post(
  "/category/create",
  requireSignIn,
  adminMiddleware,
  upload.single("categoryImage"),
  addCategory
);
router.get("/category/get", getAllCategory);
router.post(
  "/category/update",
  requireSignIn,
  adminMiddleware,
  upload.array("categoryImage"),
  updateCategory
);

router.post("/category/delete", requireSignIn, adminMiddleware, deleteCategory);
module.exports = router;
