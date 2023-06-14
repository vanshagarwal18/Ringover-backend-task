"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "task",
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("task");
  },
};
