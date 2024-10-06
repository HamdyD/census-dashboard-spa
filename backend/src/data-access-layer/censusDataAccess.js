const db = require("../config/db");
const table_name = "census_learn_sql";

const getColumns = () => {
  return new Promise((resolve, reject) => {
    const query = `PRAGMA table_info(${table_name})`;
    db.all(query, [], (error, columns) => {
      if (error) {
        return reject(error);
      }
      resolve(columns);
    });
  });
};

const getData = (column, page, limit) => {
  return new Promise((resolve, reject) => {
    const offset = (page - 1) * limit;
    const formattedColumnName = `"${column.trim()}"`;

    const paginatedQuery = `
      SELECT ${formattedColumnName}, COUNT(*) as count, AVG(age) as avg_age
      FROM ${table_name}
      GROUP BY ${formattedColumnName}
      ORDER BY count DESC
      LIMIT ? OFFSET ?;
    `;

    db.all(paginatedQuery, [limit, offset], (error, paginatedRows) => {
      if (error) {
        return reject(error);
      }

      const totalCountQuery = `
        SELECT COUNT(DISTINCT CASE 
          WHEN ${formattedColumnName} IS NULL THEN 'NULL'
          ELSE ${formattedColumnName}
        END) as totalCount
        FROM ${table_name};
      `;

      db.get(totalCountQuery, [], (error, totalCountRow) => {
        if (error) {
          return reject(error);
        }
        resolve({ paginatedRows, totalCount: totalCountRow?.totalCount ?? 0 });
      });
    });
  });
};

module.exports = {
  getColumns,
  getData,
};
