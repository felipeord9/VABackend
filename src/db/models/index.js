const { User, UserSchema } = require('./userModel')
const { Record, RecordSchema } = require('./recordsModels')

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize))
  Record.init(RecordSchema, Record.config(sequelize))

  User.associate(sequelize.models)
  Record.associate(sequelize.models)

}

module.exports = setupModels