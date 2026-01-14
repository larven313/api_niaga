const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../../config/db");

const Kartu = sequelize.define(
  "tbl_kartu",
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
    kode: {
      type: DataTypes.STRING(4),
      allowNull: false,
      unique: true,
    },
    nama: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    diskon: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0,
    },
    iuran: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0,
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

module.exports = Kartu;
