const { body, param } = require("express-validator");



exports.getSummaryValidator = () => {
    return [
        param("id").notEmpty().withMessage("Id is required").isInt().withMessage("Id must be an Integer"),
    ]
};

exports.createSummaryValidator = () => {
    return [
        body("content").notEmpty().withMessage("content is required"),
    ]
};

exports.updateSummaryValidator = () => {
    return [
        param("id").notEmpty().withMessage("Id is required").isInt().withMessage("Id must be an Integer"),
        body("content").notEmpty().withMessage("content is required"),
    ]
};

exports.deleteSummaryValidator = () => {
    return [
        param("id").notEmpty().withMessage("Id is required").isInt().withMessage("Id must be an Integer"),
    ]
}