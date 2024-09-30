const db = require("../config/db");

const table_name = "census_learn_sql";

const getColumns = (_, res) => {
  db.all(`PRAGMA table_info(${table_name})`, [], (error, columns) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.status(200).json({ columns });
  });
};

// Query based on selected column
const getData = (req, res) => {
  const { column } = req.query;

  if (!column) {
    res.status(400).json({ message: "Column is required" });
  }

  // This is necessary to handle column names that may contain spaces or special characters.
  // SQLite requires such names to be enclosed in double quotes to avoid syntax errors.
  const formattedColumnName = `"${column.trim()}"`;

  const query = `
          SELECT ${formattedColumnName}, COUNT(*) as count, AVG(age) as avg_age
          FROM ${table_name}
          GROUP BY ${formattedColumnName}
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
};

module.exports = {
  getColumns,
  getData,
};
