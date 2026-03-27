'use strict';
const { TYPE_INSTALL_TABLE, TypeInstallSchema } = require('../models/typeInstallModel')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(TYPE_INSTALL_TABLE, TypeInstallSchema);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(TYPE_INSTALL_TABLE);
  }
};

