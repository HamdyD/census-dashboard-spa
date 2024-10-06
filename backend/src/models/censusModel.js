const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Census = sequelize.define(
  "Census",
  {
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "census_learn_sql",
    timestamps: false,
  }
);

module.exports = Census;
