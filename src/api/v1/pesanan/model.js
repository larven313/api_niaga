const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../../../config/db");

const Pesanan = sequelize.define(
  "tbl_pesanan",
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
    tanggal: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pelanggan_id: {
      type: DataTypes.INTEGER,
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
    tableName: "tbl_pesanan",
    timestamps: false,
  }
);

module.exports = Pesanan;
