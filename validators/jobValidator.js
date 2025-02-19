const { body, param } = require("express-validator");



exports.getJobValidator = () => {
    return [
        param("id").notEmpty().withMessage("Id is required").isInt().withMessage("Id must be an Integer"),
    ]
};

exports.createJobValidator = () => {
    return [
        body("title").notEmpty().withMessage("Title is required"),
        body("description").notEmpty().withMessage("Description is required"),
    ]
};

exports.updateJobValidator = () => {
    return [
        param("id").notEmpty().withMessage("Id is required").isInt().withMessage("Id must be an Integer"),
        body("title").notEmpty().withMessage("Title is required"),
        body("description").notEmpty().withMessage("Description is required"),
    ]
};

exports.deleteJobValidator = () => {
    return [
        param("id").notEmpty().withMessage("Id is required").isInt().withMessage("Id must be an Integer"),
    ]
}