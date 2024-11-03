const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const { Register, getUserByEmail } = require("../services/authService");


module.exports = {

    Register: async (req, res) => {

        const data = req.body;

        const validationError = validationResult(req);

        if (!validationError.isEmpty()) {
            return res.status(400).json({
                error: validationError.array(),
            });
        }

        try {

            const existingUser = getUserByEmail(data.email);

            if (existingUser) {
                return res.status(400).json({
                    message: "Email already exist, please choose another one."
                });
            }

            const registerUser = await Register(data);

            if (registerUser) {
                return res.status(200).json({
                    status: "success",
                    user: registerUser,
                });

            } else {
                return res.status(400).json({
                    message: "User registraion failed",
                });
            }

        } catch (error) {
            console.log("Error ==> ", error);
            return res.status(500).json({
                message: "Internal server error"
            });
        }

    },



    Login: async (req, res) => {

        const data = req.body;

        const validationError = validationResult(req);

        if (!validationError.isEmpty()) {
            return res.status(400).json({
                Error: validationError.array(),
            });
        }

        try {
            const user = await getUserByEmail(data.email);

            if (!user) {
                return res.json({
                    message: `User with email ${data.email} doesn't exist`,
                });
            }


            const confirmPassword = user.confirmPassword(data.password);

            if (confirmPassword) {

                user.password = "";

                const token = user.generateToken("clinton", "1h");

                return res.status(200).json({
                    message: "login succes",
                    user: user,
                    token: token
                });
            } else {
                return res.json({
                    message: `Password is incorrect`,
                });
            }

        } catch (error) {
            console.log("Error ==> ", error);
            return res.status(500).json({
                message: "Internal server error"
            });
        }

    }

}