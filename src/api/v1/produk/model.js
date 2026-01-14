const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../../config/db");

const produk = sequelize.define(
  "tbl_produk",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    nama_barang: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stok: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    min_stok: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    harga: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 1000,
    },
    jenis_produk_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gambar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

module.exports = produk;
