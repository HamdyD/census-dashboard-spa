const express = require("express");
const { getColumns, getData } = require("../controller/censusController");

const router = express.Router();

router.get("/columns", getColumns);
router.get("/data", getData);

module.exports = router;
