const express = require("express");
const { Register, Login } = require("../controllers/authController");
const { RegisterValidationRules, LoginValidationRules } = require("../validators/authValidator");
// const { getJobs, getJobById, createJobs, updateJob, deleteJob } = require("../controllers/jobController");
// const { getJobByIdValidator, createJobValidator, updateJobValidator, deleteJobValidator } = require("../validators/jobValidator");
const { getJobValidator, createJobValidator, updateJobValidator, deleteJobValidator } = require("../validators/jobValidator");
const { getJobs, getJob, getUserJob, getUserJobs, createJob, updateJob, deleteJob } = require("../controllers/jobController");
const { getAllUsers, getUser, getUserByEmail, createUser, updateUser, deleteUser } = require("../controllers/userController");
const { getUserValidator, getUserByEmailValidator, createUserValidator, updateUserValidator, deleteUserValidator } = require("../validators/userValidator");
const { getSummaryValidator, createSummaryValidator, updateSummaryValidator, deleteSummaryValidator } = require("../validators/summaryValidator");
const { getSummaries, getSummary, getUserSummary, createSummary, updateSummary, deleteSummary } = require("../controllers/summaryController");



const { verifyToken } = require("../auth/verifyToken");

const route = express.Router();


route.get("/", (req, res) => {
    res.send("Hello World");
});


// Auth routes
route.post("/login", LoginValidationRules(), Login);
route.post("/register", RegisterValidationRules(), Register);

// Job routes
// route.get("/job", verifyToken, getJobs);
// route.get("/job/:id", verifyToken, getJobByIdValidator(), getJobById);
// route.post("/job", verifyToken, createJobValidator(), createJobs);
// route.put("/job/:id", verifyToken, updateJobValidator(), updateJob);
// route.delete("/job/:id", verifyToken, deleteJobValidator(), deleteJob);
route.get("/job", getJobs);
route.get("/job/:id", getJobValidator(), getJob);
route.get("/job/user/:id", verifyToken, getJobValidator(), getUserJob);
route.get("/job/user", verifyToken, getJobValidator(), getUserJobs);
route.post("/job", verifyToken, createJobValidator(), createJob);
route.put("/job/:id", verifyToken, updateJobValidator(), updateJob);
route.delete("/job/:id", verifyToken, deleteJobValidator(), deleteJob);

//User routes
route.get("/users", getAllUsers);
route.get("/user/:id", getUserValidator(), getUser);
route.get("/getUserByEmail/:email", getUserByEmailValidator(), getUserByEmail);
route.post("/user", createUserValidator(), createUser);
route.put("/user/:id", updateUserValidator(), updateUser);
route.delete("/user/:id", deleteUserValidator(), deleteUser);

//Summary routes
route.get("/summary", getSummaries);
route.get("/summary/:id", getSummaryValidator(), getSummary);
route.get("/summary/user/:id", verifyToken, getSummaryValidator(), getUserSummary);
route.post("/summary", verifyToken, createSummaryValidator(), createSummary);
route.put("/summary/:id", verifyToken, updateSummaryValidator(), updateSummary);
route.delete("/summary/:id", verifyToken, deleteSummaryValidator(), deleteSummary);


module.exports = route;