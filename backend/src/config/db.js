const { Sequelize } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.resolve(__dirname, "../database/us-census.db"),
});

sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the SQLite database has been established successfully."
    );
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

module.exports = sequelize;
