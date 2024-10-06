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
  const { column, page = 1, limit = 100 } = req.query;

  if (!column) {
    res.status(400).json({ message: "Column is required" });
  }

  // Ensure that page and limit are integers
  const pageNumber = parseInt(page, 10);
  const rowLimit = parseInt(limit, 10);

  const offset = (pageNumber - 1) * rowLimit;

  // This is necessary to handle column names that may contain spaces or special characters.
  // SQLite requires such names to be enclosed in double quotes to avoid syntax errors.
  const formattedColumnName = `"${column.trim()}"`;

  // Query to fetch paginated data for the frontend table
  const paginatedQuery = `
    SELECT ${formattedColumnName}, COUNT(*) as count, AVG(age) as avg_age
    FROM ${table_name}
    GROUP BY ${formattedColumnName}
    ORDER BY count DESC
    LIMIT ${rowLimit} OFFSET ${offset};
  `;

  db.all(paginatedQuery, [], (error, paginatedRows) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    // Count all distinct values for the selected column, treating NULL as a distinct value.
    // This ensures that we capture the total number of entries, including those that are NULL.
    const totalCountQuery = `
        SELECT COUNT(DISTINCT CASE 
          WHEN ${formattedColumnName} IS NULL THEN 'NULL'
          ELSE ${formattedColumnName}
        END) as totalCount
        FROM ${table_name};
      `;

    db.get(totalCountQuery, [], (error, totalCountRow) => {
      if (error) {
        res
          .status(500)
          .json({ error: `Error fetching total count: ${error.message}` });
        return;
      }

      const totalCount = totalCountRow?.totalCount ?? 0;
      const totalPages = Math.ceil(totalCountRow.totalCount / limit);

      res.status(200).json({
        data: paginatedRows,
        totalPages,
        totalCount,
      });
    });
  });
};

module.exports = {
  getColumns,
  getData,
};
