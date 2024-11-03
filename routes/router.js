const express = require("express");
const { Register, Login } = require("../controllers/authController");
const { RegisterValidationRules, LoginValidationRules } = require("../validators/authValidator");
const { getJobs, getJobById, createJobs } = require("../controllers/jobController");
const { getJobByIdValidator, createJobValidator } = require("../validators/jobValidator");
const { verifyToken } = require("../auth/verifyToken");
const route = express.Router();


route.get("/", (req, res) => {
    res.send("Hello World");
});


// Auth controllers
route.post("/login", LoginValidationRules(), Login);
route.post("/register", RegisterValidationRules(), Register);

// Job controllers
route.get("/job", verifyToken, getJobs);
route.get("/job/:id", verifyToken, getJobByIdValidator(), getJobById);
route.post("/job", verifyToken, createJobValidator(), createJobs);

module.exports = route;