const express = require("express");
const { Register, Login } = require("../controllers/auth");
const { RegisterValidationRules, LoginValidationRules } = require("../validators/authValidator");

const route = express.Router();


route.get("/", (req, res) => {
    res.send("Hello World");
});

route.post("/login", LoginValidationRules(), Login);
route.post("/register", RegisterValidationRules(), Register);


module.exports = route;