'use strict';
const { QR_TABLE, QrSchema } = require('../models/qrmodels')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(QR_TABLE, QrSchema);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(QR_TABLE);
  }
};