const { User, Summary } = require("../models/index");

module.exports = {

    getSummaries: async () => {

        try {

            const summaries = await Summary.findAll({
                include: {
                    model: User,
                    as: "user"
                }
            });

            return summaries;

        } catch (error) {
            throw new Error("Internal server error ", error);
        }

    },

    getSummary: async (id) => {

        try {
            const summary = await Summary.findByPk(id, {
                include: {
                    model: User,
                    as: "user"
                }
            });

            return summary;

        } catch (error) {
            throw new Error("Internal server error ");
        }
    },

    getUserSummary: async (user_id, id) => {
        try {
            const summary = await Summary.findOne({
                where: { id: id, user_id: user_id },
                include: {
                    model: User,
                    as: "user"
                }
            });

            return summary;

        } catch (error) {

            throw new Error("Internal server error ", error);
        }

    },

    createSummary: async (user, data) => {

        try {

            const summary = await user.createSummary({
                content: data.content,
            })

            return summary;

        } catch (error) {
            throw new Error("Internal server error ", error);
        }

    },

    updateSummary: async (summary, data) => {

        try {

            const previousUpdatedAt = summary.updatedAt;

            await summary.update({
                content: data.content
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

    deleteSummary: async (summary) => {

        try {

            await summary.destroy();

           return true;

        } catch (error) {
            throw new Error("Internal server error ");
        }

    },
}

