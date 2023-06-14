const Sequelize = require("sequelize");
const sequelize = require("../config/db");
module.exports = sequelize.define(
  "Task",
  {
    taskId: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    taskName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.ENUM,
      values: [`sms`, `mail`],
    },
    dependency: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    priority: {
      type: Sequelize.ENUM,
      values: [`1`, `2`, `3`],
    },
    timestamp: {
      type: Sequelize.BIGINT,
    },
  },
  {
    tableName: "task",
    timestamps: false,
  }
);
