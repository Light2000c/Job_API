const Job = require('../models/jobs');


module.exports = {

    getJobs: async () => {

        try{

            const jobs = await Job.findAll();

            return jobs;


        }catch(error){
            console.log(error);
            throw new Error("Something went wrong while trying to fetch jobs.");
        }
    },

    getJobById: async (id) => {

        try{

        const job = await Job.findByPk(id);

        return job;

        }catch(error){
            console.log("Error => ", error);
            throw new Error("Something went wrong while trying to fetch jobs.");
        }
    },

    createJob: async (data) => {

        try{

            const job = await Job.create({
                title: data.title,
                description: data.description
            });

            return job;

        }catch(error){
            console.log(error);
            throw new Error("Something went wrong while trying to create job");
        }
    }

    }