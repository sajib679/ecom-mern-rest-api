const express = require("express");
const { requireSignIn, userMiddleware } = require("../common-middleware/index");
const { addAddress, getAddress } = require("../controller/address");
const router = express.Router();

router.post("/user/address/create", requireSignIn, userMiddleware, addAddress);
router.post("/user/getaddress", requireSignIn, userMiddleware, getAddress);

module.exports = router;
