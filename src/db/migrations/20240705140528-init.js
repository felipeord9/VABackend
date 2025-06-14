'use strict';
const { USER_TABLE, UserSchema } = require('../models/userModel')
const { RECORD_TABLE, RecordSchema } = require('../models/recordsModels')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE,UserSchema);
    await queryInterface.createTable(RECORD_TABLE, RecordSchema);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(RECORD_TABLE);
  }
};
