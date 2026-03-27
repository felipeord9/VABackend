const { Model, DataTypes, Sequelize } = require("sequelize");

const TYPE_INSTALL_TABLE = 'typeInstall'

const TypeInstallSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
}

class TypeInstall extends Model {
  static associate(models) {
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TYPE_INSTALL_TABLE,
      modelName: 'TypeInstall',
      timestamps: false
    }
  }
}

module.exports = {
  TYPE_INSTALL_TABLE,
  TypeInstallSchema,
  TypeInstall
}