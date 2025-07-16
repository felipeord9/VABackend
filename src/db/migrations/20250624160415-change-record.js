'use strict';
const { RECORD_TABLE, RecordSchema } = require('../models/recordsModels')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(RECORD_TABLE, RecordSchema);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(RECORD_TABLE);
  }
};

