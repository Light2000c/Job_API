const { validationResult } = require("express-validator");
const userService = require("../services/userService");
const jobService = require("../services/jobService");

module.exports = {


    getJobs: async (req, res) => {

        try {

            const jobs = await jobService.getJobs();

            return res.status(200).json({
                jobs: jobs
            });

        } catch (error) {
            return res.status(500).json({
                message: "Internal server error ", error,
            });
        }

    },


    getJob: async (req, res) => {

        const id = req.params.id;

        try {

            const validationError = validationResult(req);

            if (!validationError.isEmpty()) {
                return res.status(400).json({
                    message: validationError.array(),
                });
            }

            const job = await jobService.getJob(id);

            if (job) {
                return res.status(200).json({
                    job: job
                });
            } else {
                return res.json({
                    message: `No job found with id ${id}`
                });
            }

        } catch (error) {
            return res.status(500).json({
                message: "Internal server error ", error,
            });
        }

    },


    getUserJob: async (req, res) => {

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

            const job = await jobService.getUserjob(user_id, id);

            if (job) {
                return res.status(200).json({
                    job: job
                });
            } else {
                return res.json({
                    message: `job was not found`
                });
            }

        } catch (error) {
            return res.status(500).json({
                message: "Internal server error ", error,
            });
        }


    },



    getUserJobs: async (req, res) => {

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

            const jobs = await jobService.getUserJobs(user_id, id);

            if (jobs) {
                return res.status(200).json({
                    jobs: jobs
                });
            } else {
                return res.json({
                    message: `job was not found`
                });
            }

        } catch (error) {
            return res.status(500).json({
                message: "Internal server error ", error,
            });
        }

    },


    createJob: async (req, res) => {

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

            const job = await jobService.createJob(user, data);

            if (job) {
                return res.status(200).json({
                    job: job
                });
            } else {
                return res.status(400).json({
                    message: "job was not successfully created",
                });
            }

        } catch (error) {
            return res.status(500).json({
                message: "Internal server error ", error,
            });
        }
    },


    updateJob: async (req, res) => {

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

            const job = await jobService.getUserJob(user_id, id);

            if (!job) {
                return res.json({
                    message: `job was not found`
                });
            }

            const isUpdated = await jobService.updatejob(job, data);

            if (isUpdated >= 1) {
                return res.status(200).json({
                    message: `job has been successfully updated`
                });
            } else {
                return res.status(400).json({
                    message: `Something went wrong, job was not updated.`
                });
            }

        } catch (error) {
            return res.status(500).json({
                message: "Internal server error ", error,
            });
        }
    },


    deleteJob: async (req, res) => {


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

            const job = await jobService.getUserJob(user_id, id);

            if (!job) {
                return res.json({
                    message: `job was not found`
                });
            }

            const isDeleted = await jobService.deleteJob(job);


            if (isDeleted) {
                return res.status(200).json({
                    message: `job has been successfully deleted`
                });
            } else {
                return res.status(400).json({
                    message: `Something went wrong, job was not deleted.`
                });
            }

        } catch (error) {
            return res.status(500).json({
                message: "Internal server error ", error,
            });
        }
    }
}

// module.exports = {

//     getJobs: async (req, res) => {

//         try {

//             const jobs = await getJobs();

//             return res.status(200).json({
//                 jobs: jobs,
//             });

//         } catch (error) {
//             console.log("Error =>", error);
//             res.status(500).json({
//                 message: "Internal server error."
//             });
//         }
//     },

//     getJobById: async (req, res) => {

//         const id = req.params.id;

//         try {
//             const validationError = validationResult(req);

//             if (!validationError.isEmpty()) {
//                 return res.status(400).json({
//                     error: validationError.array(),
//                 });
//             }

//             const job = await getJobById(id);

//             if (job) {
//                 return res.status(200).json({
//                     job: job
//                 });
//             } else {
//                 return res.json({
//                     message: "No Job found with id " + id
//                 });
//             }

//         } catch (error) {
//             console.log("Error =>", error);
//             res.status(500).json({
//                 message: "Internal server error."
//             });
//         }
//     },


//     createJobs: async (req, res) => {

//         const data = req.body;

//         try {

//             const validationError = validationResult(req);

//             if (!validationError.isEmpty()) {
//                 return res.status(400).json({
//                     error: validationError.array()
//                 })
//             }

//             const newJob = await createJob(data);

//             if (newJob) {
//                 return res.status(200).json({
//                     message: "Job has been successfully created.",
//                     job: newJob
//                 });
//             } else {
//                 return res.status(400).json({
//                     message: "Job was not successfully created"
//                 });
//             }


//         } catch (error) {
//             console.log("Error =>", error);
//             res.status(500).json({
//                 message: "Internal server error."
//             });
//         }
//     },


//     updateJob: async (req, res) => {

//         const { id } = req.params;
//         const data = req.body;



//         try {

//             const validationError = validationResult(req)

//             if (!validationError.isEmpty()) {
//                 return res.status(400).json({
//                     error: validationError.array(),
//                 });
//             }

//             const job = await getJobById(id);

//             if (!job) {
//                 return res.status(400).json({
//                     message: `Job with id ${id} was not found`,
//                 });
//             }

//             const updatedRowsCount = await updateJob(id, data);

//             return res.status(200).json({
//                 message: "Job has been successfully updated"
//             });



//         } catch (error) {
//             return res.status(500).json({
//                 message: "Internal server error"
//             })
//         }
//     },


//     deleteJob: async (req, res) => {

//         const { id } = req.params.id;


//         try {
//             const validationError = validationResult(req)

//             if (!validationError.isEmpty()) {
//                 return res.status(400).json({
//                     error: validationError.array(),
//                 });
//             }

//             const job = await getJobById(id);

//             if (!job) {
//                 return res.status(400).json({
//                     message: `Job with id ${id} was not found`,
//                 });
//             }

//             const updatedRowsCount = await deleteJob(id);


//             return res.status(200).json({
//                 message: "Job has been successfully deleted"
//             });

//         } catch (error) {
//             res.status(500).json({
//                 message: "Internal server error",
//             });
//         }
//     }
// }