const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
// const User = require("./user");
const { User } = require("./user");


const Summary = sequelize.define('Summary', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "summary",
    timestamps: true
});


 
module.exports = Summary;