const express = require("express");
const {
  requireSignIn,
  adminMiddleware,
  upload,
} = require("../common-middleware/index");
const { addBanner, getBanner } = require("../controller/banner");
const router = express.Router();

router.get("/banner", getBanner);
router.post(
  "/banner",
  requireSignIn,
  adminMiddleware,
  upload.array("bannerImages"),
  addBanner
);

module.exports = router;
