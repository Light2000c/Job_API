const { DataTypes } = require("sequelize");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");

const sequelize = require("../config/sequelize");

// const Summary = require("./summary");


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
});



User.hashPassword = function (password) {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
}

User.prototype.confirmPassword = function (password) {
    return compareSync(password, this.password);
}

User.prototype.generateToken = function (secret, time) {
    const payload = {
        id: this.id,
        name: this.name,
        email: this.email
    }
    return jwt.sign(payload, secret, { expiresIn: time });
}

module.exports = User;

