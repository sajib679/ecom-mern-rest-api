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
  updatePage,
  deletePage,
  deletePageImage,
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

router.patch(
  "/page/update",
  upload.fields([
    {
      name: "bannersImage",
    },
    { name: "productsImage" },
  ]),
  requireSignIn,
  adminMiddleware,
  updatePage
);
router.patch(
  "/page/deleteimage",
  requireSignIn,
  adminMiddleware,
  deletePageImage
);

router.delete("/page/delete", requireSignIn, adminMiddleware, deletePage);

router.get("/page/get", getPages);
router.get("/page/:category/:type", getPage);

module.exports = router;
