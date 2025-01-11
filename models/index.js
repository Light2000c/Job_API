const sequelize = require("../config/sequelize");
const User = require("./user");
const Summary = require("./summary");
const Job = require("./jobs");

// Initialize associations
User.hasOne(Summary, { foreignKey: "user_id", as: "summary" });
User.hasMany(Summary, { foreignKey: "user_id", as: "jobs" });

Job.belongsTo(User, {foreignKey: "user_id", as: "user"})
Summary.belongsTo(User, { foreignKey: "user_id", as: "user" });

module.exports = { sequelize, User, Job, Summary };
