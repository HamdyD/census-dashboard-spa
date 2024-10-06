const { Sequelize } = require("sequelize");
const Census = require("../models/censusModel");
const sequelize = require("../config/db");

// Helper function to safely quote column names
const quoteColumnName = (columnName) => {
  return `"${columnName.replace(/"/g, '""')}"`;
};

const getColumns = async () => {
  try {
    const columns = await sequelize.query(
      `PRAGMA table_info(census_learn_sql)`,
      {
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    return columns;
  } catch (error) {
    throw new Error(`Error fetching columns: ${error.message}`);
  }
};

const getData = async (column, page = 1, limit = 100) => {
  try {
    const offset = (page - 1) * limit;

    // Dynamically use the selected column in the query
    const result = await Census.findAll({
      attributes: [
        [sequelize.col(column), column], // Dynamically include the selected column
        [sequelize.fn("COUNT", sequelize.col(column)), "count"], // Count occurrences of the column
        [sequelize.fn("AVG", sequelize.col("age")), "avg_age"], // Average of 'age'
      ],
      group: [column], // Group by the selected column
      order: [[sequelize.literal("count"), "DESC"]], // Order by count descending
      limit: limit,
      offset: offset,
    });

    const quotedColumn = quoteColumnName(column);

    // Query to count the total distinct values for the selected column
    const totalCountResult = await sequelize.query(
      `SELECT COUNT(DISTINCT CASE WHEN ${quotedColumn} IS NULL THEN 'NULL' ELSE ${quotedColumn} END) as totalCount
      FROM census_learn_sql;`,
      {
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    const totalCount = totalCountResult[0]?.totalCount ?? 0;

    return {
      paginatedRows: result,
      totalCount,
    };
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};

module.exports = {
  getColumns,
  getData,
};
