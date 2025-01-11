const { validationResult } = require("express-validator");
const userService = require("../services/userService");
const summaryService = require("../services/summaryService");

module.exports = {


    getSummaries: async (req, res) => {

        try {

            const summaries = await summaryService.getSummaries();

            return res.status(200).json({
                summaries: summaries
            });

        } catch (error) {
            return res.status(500).json({
                message: "Internal server error ", error,
            });
        }

    },


    getSummary: async (req, res) => {

        const id = req.params.id;

        try {

            const validationError = validationResult(req);

            if (!validationError.isEmpty()) {
                return res.status(400).json({
                    message: validationError.array(),
                });
            }

            const summary = await summaryService.getSummary(id);

            if (summary) {
                return res.status(200).json({
                    summary: summary
                });
            } else {
                return res.json({
                    message: `No summary found with id ${id}`
                });
            }

        } catch (error) {
            return res.status(500).json({
                message: "Internal server error ", error,
            });
        }

    },


    getUserSummary: async (req, res) => {

        const id = req.params.id;
        const user_id = req.user.id;

        console.log("user ==> ", req.user.id);

        try {

            const validationError = validationResult(req);

            if (!validationError.isEmpty()) {
                return res.status(400).json({
                    message: validationError.array(),
                });
            }

            const summary = await summaryService.getUserSummary(user_id, id);

            if (summary) {
                return res.status(200).json({
                    summary: summary
                });
            } else {
                return res.json({
                    message: `Summary was not found`
                });
            }

        } catch (error) {
            return res.status(500).json({
                message: "Internal server error ", error,
            });
        }

    },


    createSummary: async (req, res) => {

        const data = req.body;
        const id = req.user.id;

        try {

            const validationError = validationResult(req);

            if (!validationError.isEmpty()) {
                return res.status(400).json({
                    message: validationError.array(),
                });
            }

            const user = await userService.getUser(id);

            if (!user) {
                return res.status(400).json({
                    message: `No user was found with Id ${id}`,
                });
            }

            const summary = await summaryService.createSummary(user, data);

            if (summary) {
                return res.status(200).json({
                    summary: summary
                });
            } else {
                return res.status(400).json({
                    message: "Summary was not successfully created",
                });
            }

        } catch (error) {
            return res.status(500).json({
                message: "Internal server error ", error,
            });
        }
    },


    updateSummary: async (req, res) => {

        const id = req.params.id;
        const user_id = req.user.id;
        const data = req.body;


        try {

            const validationError = validationResult(req);

            if (!validationError.isEmpty()) {
                return res.status(400).json({
                    message: validationError.array(),
                });
            }

            const summary = await summaryService.getUserSummary(user_id, id);

            if (!summary) {
                return res.json({
                    message: `Summary was not found`
                });
            }

            const isUpdated = await summaryService.updateSummary(summary, data);

            if (isUpdated >= 1) {
                return res.status(200).json({
                    message: `Summary has been successfully updated`
                });
            } else {
                return res.status(400).json({
                    message: `Something went wrong, summary was not updated.`
                });
            }

        } catch (error) {
            return res.status(500).json({
                message: "Internal server error ", error,
            });
        }
    },


    deleteSummary: async (req, res) => {


        const id = req.params.id;
        const user_id = req.user.id;

        // console.log("user ==> ", req.user);

        try {

            const validationError = validationResult(req);

            if (!validationError.isEmpty()) {
                return res.status(400).json({
                    message: validationError.array(),
                });
            }

            const summary = await summaryService.getUserSummary(user_id, id);

            if (!summary) {
                return res.json({
                    message: `Summary was not found`
                });
            }

            const isDeleted = await summaryService.deleteSummary(summary);


            if (isDeleted) {
                return res.status(200).json({
                    message: `Summary has been successfully deleted`
                });
            } else {
                return res.status(400).json({
                    message: `Something went wrong, summary was not deleted.`
                });
            }

        } catch (error) {
            return res.status(500).json({
                message: "Internal server error ", error,
            });
        }
    }
}