const { Model, DataTypes, Sequelize } = require("sequelize");
const { USER_TABLE } = require("./userModel")

const RECORD_TABLE = "record";

const RecordSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  status:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  placa: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  initialVideo: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    field: "initial_video",
  },
  initialCreatedBy:{
    type: DataTypes.STRING,
    allowNull: true,
    field:'initial_created_by',
  },
  initalDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: "initial_date",
  },
  finalVideo: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    field: "final_video",
  },
  finalCreatedBy:{
    type: DataTypes.STRING,
    allowNull: true,
    field:'final_created_by',
  },
  finalDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: "final_date",
  },
  news:{
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  newsCreatedBy:{
    type: DataTypes.STRING,
    allowNull: true,
    field:'news_created_by',
  },
  newsDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: "news_date",
  },
  motivo:{
    type: DataTypes.TEXT,
    allowNull: true
  },
  /* userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'created_by',
    references: {
      model: USER_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  }, */
  observations: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  reasonNews:{
    type: Sequelize.STRING,
    allowNull: true,
    /* field:'reason_news' */
  }
};

class Record extends Model {
  static associate(models) {
    /* this.belongsTo(models.User, { as: 'user'}) */
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