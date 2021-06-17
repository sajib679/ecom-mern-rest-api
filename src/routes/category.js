const express = require("express");
const {
  requireSignIn,
  adminMiddleware,
} = require("../common-middleware/index");
const {
  addCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/category");
const multer = require("multer");
const router = express.Router();

const shortid = require("shortid");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

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
