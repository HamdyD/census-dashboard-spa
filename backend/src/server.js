const express = require("express");
const cors = require("cors");
const censusRoutes = require("../src/routes/censusRoutes");

const app = express();
const PORT = 3000;

app.use(cors());

// Routes
app.use("/", censusRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
