const { User, UserSchema } = require('./userModel')
const { Record, RecordSchema } = require('./recordsModels')
const { Qr, QrSchema } = require('./qrmodels')

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize))
  Record.init(RecordSchema, Record.config(sequelize))
  Qr.init(QrSchema, Qr.config(sequelize))

  User.associate(sequelize.models)
  Record.associate(sequelize.models)
  Qr.associate(sequelize.models)

}

module.exports = setupModels