const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());

const dbPath = path.resolve(__dirname, "database/us-census.db");

// Connect to the SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening the database: ", err.message);
    process.exit(1);
  } else {
    console.log("Connected to the SQLite database");
  }
});
const table_name = "census_learn_sql";

// Get columns and values from the db
app.get("/columns", (_, res) => {
  db.all(`PRAGMA table_info(${table_name})`, [], (error, columns) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.status(200).json({ columns });
  });
});

// Query based on selected column
app.get("/data", (req, res) => {
  const { column } = req.query;

  if (!column) {
    res.status(400).json({ message: "Column is required" });
  }

  // This is necessary to handle column names that may contain spaces or special characters.
  // SQLite requires such names to be enclosed in double quotes to avoid syntax errors.
  const formattedColumnNmae = `"${column.trim()}"`;

  const query = `
    SELECT ${formattedColumnNmae}, COUNT(*) as count, AVG(age) as avg_age
    FROM ${table_name}
    GROUP BY ${formattedColumnNmae}
    ORDER BY count DESC
    LIMIT 100;
  `;

  db.all(query, [], (error, rows) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.status(200).json({ data: rows });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
