const { User, Job } = require("../models/index");

module.exports = {

    getSummaries: async () => {

        try {

            const jobs = await Job.findAll({
                include: {
                    model: User,
                    as: "user"
                }
            });

            return jobs;

        } catch (error) {
            throw new Error("Internal server error ", error);
        }

    },

    getJob: async (id) => {

        try {
            const job = await Job.findByPk(id, {
                include: {
                    model: User,
                    as: "user"
                }
            });

            return job;

        } catch (error) {
            throw new Error("Internal server error ");
        }
    },

    getUserJob: async (user_id, id) => {
        try {
            const job = await Job.findOne({
                where: { id: id, user_id: user_id },
                include: {
                    model: User,
                    as: "user"
                }
            });

            return job;

        } catch (error) {

            throw new Error("Internal server error ", error);
        }

    },

    getUserJobs: async (user_id, id) => {
        try {
            const jobs = await Job.findAll({
                where: { id: id, user_id: user_id },
                include: {
                    model: User,
                    as: "user"
                }
            });

            return jobs;

        } catch (error) {

            throw new Error("Internal server error ", error);
        }

    },

    createJob: async (user, data) => {

        try {

            const job = await user.createJob({
                title: data.title,
                description: data.description
            })

            return job;

        } catch (error) {
            throw new Error("Internal server error ", error);
        }

    },

    updateJob: async (job, data) => {

        try {

            const previousUpdatedAt = job.updatedAt;

            await job.update({
                title: data.title,
                description: data.description
            });

            if (summary.updatedAt > previousUpdatedAt) {
                return true;
            } else {
                return false;
            }


        } catch (error) {
            throw new Error("Internal server error ");
        }

    },

    deleteJob: async (job) => {

        try {

            await job.destroy();

           return true;

        } catch (error) {
            throw new Error("Internal server error ");
        }

    },
}






// module.exports = {

//     getJobs: async () => {

//         try {

//             const jobs = await Job.findAll();

//             return jobs;


//         } catch (error) {
//             console.log(error);
//             throw new Error("Something went wrong while trying to fetch jobs.");
//         }
//     },

//     getJobById: async (id) => {

//         try {

//             const job = await Job.findByPk(id);

//             return job;

//         } catch (error) {
//             console.log("Error => ", error);
//             throw new Error("Something went wrong while trying to fetch jobs.");
//         }
//     },

//     getUserJob: async () => {

//     },

//     createJob: async (data) => {

//         try {

//             const job = await Job.create({
//                 title: data.title,
//                 description: data.description
//             });

//             return job;

//         } catch (error) {
//             console.log(error);
//             throw new Error("Something went wrong while trying to create job");
//         }
//     },

//     updateJob: async (id, data) => {

//         try {


//             const updatedRowsCount = await Job.update(data, {
//                 where: { id: id },
//                 // returning: true
//             });


//             return updatedRowsCount;

//         } catch (error) {

//             throw new Error(`Something went wrong ${error}.`);
//         }
//     },

//     deleteJob: async (id) => {

//         try {
//             const updatedRowsCount = await Job.destroy({
//                 where: { id: id }
//             });

//             return updatedRowsCount;


//         } catch (error) {
//             throw new Error(`Something went wrong ${error}`);
//         }
//     }

// }