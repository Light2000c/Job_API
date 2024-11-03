const { validationResult } = require("express-validator");

const { getJobs, getJobById, createJob } = require("../services/jobService");

module.exports = {

    getJobs: async (req, res) => {

        try {

            const jobs = await getJobs();

            return res.status(200).json({
                jobs: jobs,
            });

        } catch (error) {
            console.log("Error =>", error);
            res.status(500).json({
                message: "Internal server error."
            });
        }
    },

    getJobById: async (req, res) => {

        const id = req.params.id;

        try {
            const validationError = validationResult(req);

            if (!validationError.isEmpty()) {
                return res.status(400).json({
                    error: validationError.array(),
                });
            }

            const job = await getJobById(id);

            if (job) {
                return res.status(200).json({
                    job: job
                });
            } else {
                return res.json({
                    message: "No Job found with id " + id
                });
            }

        } catch (error) {
            console.log("Error =>", error);
            res.status(500).json({
                message: "Internal server error."
            });
        }
    },


    createJobs: async (req, res) => {

        const data = req.body;

        try {

            const validationError = validationResult(req);

            if (!validationError.isEmpty()) {
                return res.status(400).json({
                    error: validationError.array()
                })
            }

            const newJob = await createJob(data);

            if (newJob) {
                return res.status(200).json({
                    message: "Job has been successfully created.",
                    job: newJob
                });
            } else {
                return res.status(400).json({
                    message: "Job was not successfully created"
                });
            }


        } catch (error) {
            console.log("Error =>", error);
            res.status(500).json({
                message: "Internal server error."
            });
        }
    }
}