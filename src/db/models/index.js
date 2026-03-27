const { User, UserSchema } = require('./userModel')
const { Record, RecordSchema } = require('./recordsModels')
const { Qr, QrSchema } = require('./qrmodels')
const { TypeInstall, TypeInstallSchema } = require('./typeInstallModel')

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize))
  Record.init(RecordSchema, Record.config(sequelize))
  Qr.init(QrSchema, Qr.config(sequelize))
  TypeInstall.init(TypeInstallSchema, TypeInstall.config(sequelize))

  User.associate(sequelize.models)
  Record.associate(sequelize.models)
  Qr.associate(sequelize.models)
  TypeInstall.associate(sequelize.models)

}

module.exports = setupModels