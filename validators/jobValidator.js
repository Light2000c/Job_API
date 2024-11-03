const { body, query, param } = require("express-validator");

exports.createJobValidator = () => {
    return [
        body("title").notEmpty().withMessage("Title is required"),
        body("description").notEmpty().withMessage("Description is required"),
    ]
}

exports.getJobByIdValidator = () => {
    return [
        param("id").notEmpty().withMessage("Id is required").isInt().withMessage("Id must be an Integer"),
    ]
}
