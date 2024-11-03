const User = require("../models/user");


module.exports = {

    Register: async (data) => {

        try {

            const hashedpassword = User.hashPassword(data.password);

            const user = User.create({
                name: data.name,
                email: data.email,
                password: hashedpassword
            });

            return user;

        } catch (error) {
            throw new Error("Something went wrong, please try again.");

        }
    },

    getUserByEmail: async (email) => {

        try {

            const user = await User.findOne({
                where: { email: email },
            });

            return user;

        } catch {
            throw new Error("Something went wrong, please try again.");
        }

    }
}