const { validationResult } = require("express-validator");
const userService = require("../services/userService");


module.exports = {

    getAllUsers: async (req, res) => {

        try {

            const users = await userService.getAllUsers();

            return res.status(200).json({
                users: users
            });

        } catch (error) {
            return res.status(500).json({
                message: "Internal server error" + error,
            });
        }
    },

    getUser: async (req, res) => {

        const id = req.params.id;
        console.log("savage");

        try {

            const validationError = validationResult(req);

            if (!validationError.isEmpty()) {
                return res.status(400).json({
                    Error: validationError.array(),
                });
            }

            const user = await userService.getUser(id);

            if (!user) {
                return res.status(200).json({
                    message: `No user found with id ${id}!`
                });
            }

            return res.status(200).json({
                user: user
            });

        } catch (error) {
            return res.status(500).json({
                message: "Internal server error " + error,
            });
        }
    },


    getUserByEmail: async (req, res) => {

        const email = req.params.email;

        try {

            const validationError = validationResult(req);

            if (!validationError.isEmpty()) {
                return res.status(400).json({
                    Error: validationError.array(),
                });
            }

            const user = await userService.getUserByEmail(email);

            if (!user) {
                return res.status(200).json({
                    message: `No user found with email ${email}!`
                });
            }

            return res.status(200).json({
                user: user
            });

        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    },

    createUser: async (req, res) => {

        const data = req.body;

        try {

            const validationError = validationResult(req);

            if (!validationError.isEmpty()) {
                return res.status(400).json({
                    Error: validationError.array(),
                });
            }

            const email = await userService.getUserByEmail(data.email);

            if (email) {
                return res.status(400).json({
                    message: "email already exist.",
                });
            }

            const newUser = await userService.createUser(data);

            if (newUser) {
                return res.status(200).json({
                    user: newUser,
                });
            } else {
                return res.status(400).json({
                    message: "user was not successfully created.",
                });
            }


        } catch (error) {

            return res.status(500).json({
                message: "Internal server error",
            });
        }
    },

    updateUser: async (req, res) => {

        const id = req.params.id;
        const data = req.body;

        try {

            const validationError = validationResult(req);

            if (!validationError.isEmpty()) {
                return res.status(400).json({
                    Error: validationError.array(),
                });
            }



            const user = await userService.getUser(id);

            if (!user) {
                return res.status(400).json({
                    message: `No user found with id ${id}`
                });
            }


            const updated = await userService.updateUser(id, data);

            if (updated >= 1) {
                return res.status(200).json({
                    message: "user info has been successfully updated.",
                });
            } else {
                return res.status(400).json({
                    message: "user info was not successfully updated.",
                });
            }


        } catch (error) {

            return res.status(500).json({
                message: "Internal server error",
            });
        }
    },


    deleteUser: async (req, res) => {

        const id = req.params.id;

        try {

            const validationError = validationResult(req);

            if (!validationError.isEmpty()) {
                return res.status(400).json({
                    Error: validationError.array(),
                });
            }



            const user = await userService.getUser(id);

            if (!user) {
                return res.status(400).json({
                    message: `No user found with id ${id}`
                });
            }


            const deleted = await userService.deleteUser(id);

            if (deleted >= 1) {
                return res.status(200).json({
                    message: "user has been successfully deleted.",
                });
            } else {
                return res.status(400).json({
                    message: "user was not successfully deleted.",
                });
            }


        } catch (error) {

            console.log("error => ", error)
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }
}