'use strict';
const { RECORD_TABLE, RecordSchema } = require('../models/recordsModels')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(RECORD_TABLE, 'zone', {
      type: Sequelize.STRING,
      allowNull: true,
    })

  },

  async down (queryInterface, Sequelize) {
    //
  }
};

