const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../../config/db");
const User = require("../user/model");

const Pelanggan = sequelize.define(
  "tbl_pelanggan",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    nama: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    gender: {
      type: DataTypes.CHAR(1),
      allowNull: false,
    },
    no_hp: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    alamat: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tgl_lahir: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    kartu_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
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

module.exports = Pelanggan;
