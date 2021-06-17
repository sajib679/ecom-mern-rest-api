const express = require("express");
const { requireSignIn } = require("../../common-middleware");
const { signup, signin, signout } = require("../../controller/admin/auth");
const router = express.Router();
const {
  validateSignUpRequest,
  validateSignInRequest,
  isRequestValidated,
} = require("../../validators/auth");

router.post("/admin/signup", validateSignUpRequest, isRequestValidated, signup);
router.post("/admin/signin", validateSignInRequest, isRequestValidated, signin);
router.post("/admin/signout", requireSignIn, signout);

module.exports = router;
