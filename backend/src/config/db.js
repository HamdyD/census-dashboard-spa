const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "../database/us-census.db");

// Connect to the SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening the database: ", err.message);
    process.exit(1);
  } else {
    console.log("Connected to the SQLite database");
  }
});

module.exports = db;
