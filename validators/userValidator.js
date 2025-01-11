const { param, body } = require("express-validator");


exports.getUserValidator = () => {
    return [
        param("id").notEmpty().withMessage("Id is required").isInt().withMessage("Id must be an integer")
    ]
}

exports.getUserByEmailValidator = () => {
    return [
        param("email").notEmpty().withMessage("email is required").isEmail().withMessage("Invalid email address"),
    ]
}

exports.createUserValidator = () => {
    return [
        body("name").notEmpty().withMessage("name is required"),
        body("email").notEmpty().withMessage("email is required").isEmail().withMessage("Invalid email address"),
        body("password").notEmpty().withMessage("password is required"),
        body("password_confirmation").notEmpty().withMessage("Please confirm your password")
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("Passwords do not match");
                }

                return true;
            }),
    ]
}

exports.updateUserValidator = () => {
    return [
        param("id").notEmpty().withMessage("Id is required").isInt().withMessage("Id must be an integer"),
        body("name").notEmpty().withMessage("name is required"),
        body("email").notEmpty().withMessage("email is required").isEmail().withMessage("Invalid email address"),
    ]
}

exports.deleteUserValidator = () => {
    return [
        param("id").notEmpty().withMessage("Id is required").isInt().withMessage("Id must be an integer"),
    ]
}