const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/db");

const history = sequelize.define(
  "tbl_history",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Melakukan aktivitas",
    },
    table: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "tbl_history",
    timestamps: true,
  }
);

module.exports = history;
