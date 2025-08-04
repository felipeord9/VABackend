const { Model, DataTypes, Sequelize } = require("sequelize");

const QR_TABLE = "qr";

const QrSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  numFactura:{
    type: DataTypes.STRING,
    allowNull: false,
    field:'numero_factura'
  },
  razonSocial: {
    type: DataTypes.STRING,
    allowNull: false,
    field:'razon_social'
  },
  refProduct:{
    type: DataTypes.STRING,
    allowNull: true,
    field:'referencia_producto',
  },
  descriProduct: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "descripcion_producto",
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  arriveDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: "fecha_llegada",
  },
  observations: {
    type: DataTypes.TEXT,
    allowNull: true,
    field:'observaciones'
  },
  createdBy:{
    type: DataTypes.STRING,
    allowNull: true,
    field:'creador',
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'fecha_creacion',
    defaultValue: Sequelize.NOW
  }
};

class Qr extends Model {
  static associate(models) {
    /* this.belongsTo(models.User, { as: 'user'}) */
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: QR_TABLE,
      modelName: 'Qr',
      timestamps: false
    }
  }
}

module.exports = {
  QR_TABLE,
  QrSchema,
  Qr
}