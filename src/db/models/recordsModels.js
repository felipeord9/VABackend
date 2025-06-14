const { Model, DataTypes, Sequelize } = require("sequelize");
const { USER_TABLE } = require("./userModel")

const RECORD_TABLE = "record";

const RecordSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  placa: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  initialVideo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: "initial_video",
  },
  initalDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "initial_date",
  },
  finalVideo: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    field: "final_video",
  },
  finalDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: "final_date",
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'created_by',
    references: {
      model: USER_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  observations: {
    type: DataTypes.TEXT,
    allowNull: true
  },
};

class Record extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user'})
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: RECORD_TABLE,
      modelName: 'Record',
      timestamps: false
    }
  }
}

module.exports = {
  RECORD_TABLE,
  RecordSchema,
  Record
}