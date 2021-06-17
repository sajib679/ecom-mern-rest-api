const express = require("express");
const { signup, signin, signout } = require("../controller/auth");
const { requireSignIn } = require("../common-middleware/index");

const router = express.Router();
const {
  validateSignUpRequest,
  validateSignInRequest,
  isRequestValidated,
} = require("../validators/auth");

router.post("/signup", validateSignUpRequest, isRequestValidated, signup);
router.post("/signin", validateSignInRequest, isRequestValidated, signin);
router.post("/signout", requireSignIn, signout);

module.exports = router;
