const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../../config/db");

const PesananItem = sequelize.define(
  "tbl_pesanan_items",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    barang_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pesanan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    harga: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

module.exports = PesananItem;
