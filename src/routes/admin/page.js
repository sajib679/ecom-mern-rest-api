const express = require("express");
const {
  upload,
  requireSignIn,
  adminMiddleware,
} = require("../../common-middleware");
const {
  createPage,
  getPages,
  getPage,
} = require("../../controller/admin/page");
const router = express.Router();

router.post(
  "/page/create",
  upload.fields([
    {
      name: "bannersImage",
    },
    { name: "productsImage" },
  ]),
  requireSignIn,
  adminMiddleware,
  createPage
);

router.get("/page/get", getPages);
router.get("/page/:category/:type", getPage);

module.exports = router;
