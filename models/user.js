const { DataTypes } = require("sequelize");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");

const sequelize = require("../config/sequelize");

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'users',
    timestamps: true,
}
);

User.hashPassword = function (password) {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
}

User.prototype.confirmPassword =  function(password){
    return compareSync(password, this.password);
}

module.exports = User;

