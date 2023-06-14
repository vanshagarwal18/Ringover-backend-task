const Sequelize = require("sequelize");

const sequelize = new Sequelize("task", "root", "password", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
global.sequelize = sequelize;
