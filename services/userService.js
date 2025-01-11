const { User, Summary } = require("../models/index");


module.exports = {

    getAllUsers: async () => {

        try {
            const users = await User.findAll();

            return users;

        } catch (error) {
            throw new Error(`error: ${error}`);
        }
    },

    getUser: async (id) => {

        try {

            // const user = await User.findByPk(id);
            const user = await User.findByPk(id, {
                include: {
                    model: Summary,
                    as: "summary"
                }
            });

            return user;

        } catch (error) {
            throw new Error(`error: ${error}`);
        }
    },

    getUserByEmail: async (email) => {

        try {

            const user = await User.findOne({
                where: { email: email },
                include: {
                    model: Summary,
                    as: "summary"
                }
            });

            return user;

        } catch (error) {
            throw new Error(`error: ${error}`);
        }
    },

    createUser: async (data) => {

        try {

            const hashedpassword = User.hashPassword(data.password);

            const user = await User.create({
                name: data.name,
                email: data.email,
                password: hashedpassword,
            });

            return user;

        } catch (error) {
            throw new Error(`error: ${error}`);
        }
    },

    updateUser: async (id, data) => {

        try {
            const updatedRowsCount = await User.update(data, {
                where: { id: id }
            });

            return updatedRowsCount;

        } catch (error) {
            throw new Error(`error: ${error}`);
        }

    },

    deleteUser: async (id) => {

        try {
            const updatedRowsCount = await User.destroy({
                where: { id: id }
            });

            return updatedRowsCount;

        } catch (error) {
            throw new Error(`error: ${error}`);
        }

    }


}