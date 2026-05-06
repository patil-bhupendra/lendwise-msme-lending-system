const express = require("express");
const cors = require("cors");

const decisionRoutes = require("./routes/decision.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", decisionRoutes);

module.exports = app;