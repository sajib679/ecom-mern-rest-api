const { check ,validationResult } = require('express-validator');


exports.validateSignUpRequest = [
	check("firstName")
		.notEmpty()
		.withMessage("First Name is required"),
	check("lastName")
		.notEmpty()
		.withMessage("Last Name is required"),
	check("email")
		.isEmail()
		.withMessage("Email is required"),
	
	check('password')
		.isLength({ min: 5 })
		.withMessage('must be at least 5 chars long')
		.matches(/\d/)
		.withMessage('must contain a number')
];

exports.validateSignInRequest = [
	check("email")
		.isEmail()
		.withMessage("Email is required"),
	
	check('password')
		.isLength({ min: 5 })
		.withMessage('must be at least 5 chars long')
		.matches(/\d/)
		.withMessage('must contain a number')
];

exports.isRequestValidated = (req, res, next) => {
	      const errors = validationResult(req);
	if (errors.array().length > 0) {
	   return res.status(400).json({ errors: errors.array() })

	}
	next();
}