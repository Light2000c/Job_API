const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Job = sequelize.define("Job", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},{
    tableName: "jobs",
    timestamps: true
}
);

module.exports = Job;