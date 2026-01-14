const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../../config/db");
const Pelanggan = require("../pelanggan/model");

const User = sequelize.define(
  "tbl_user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true,
    },
    username: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("superadmin", "admin", "pelanggan", ""),
      defaultValue: "pelanggan",
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("aktif", "nonaktif"),
      defaultValue: "aktif",
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
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

module.exports = User;
