const { body } = require("express-validator");

exports.RegisterValidationRules = () => {
    return [
        body('name').notEmpty().withMessage("Name is required"),
        body('email').isEmail().withMessage("Invalid email format").notEmpty().withMessage("Name is required"),
        body('password').notEmpty().withMessage("Password is required"),
        body('password_confirmation').notEmpty().withMessage("Please confirm your password")
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("Passwords do not match");
                }

                return true;
            }),
    ]
}


exports.LoginValidationRules = () => {
    return [
        body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Please provide a valid email address"),
        body("password").notEmpty().withMessage("Password is required"),
    ]
}