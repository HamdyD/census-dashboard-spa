const censusDataAccess = require("../data-access-layer/censusDataAccess");

const getColumns = async (_, res) => {
  try {
    const columns = await censusDataAccess.getColumns();
    res.status(200).json({ columns });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getData = async (req, res) => {
  const { column, page = 1, limit = 100 } = req.query;

  if (!column) {
    return res.status(400).json({ message: "Column is required" });
  }

  try {
    const { paginatedRows, totalCount } = await censusDataAccess.getData(
      column,
      parseInt(page, 10),
      parseInt(limit, 10)
    );
    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      data: paginatedRows,
      totalPages,
      totalCount,
    });
  } catch (error) {
    res.status(500).json({ error: `Error fetching data: ${error.message}` });
  }
};

module.exports = {
  getColumns,
  getData,
};
