const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../../config/db");

const jenis_produk = sequelize.define(
  "tbl_jenis_produk",
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
    nama: {
      type: DataTypes.STRING,
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

module.exports = jenis_produk;
