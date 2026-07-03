const express = require("express");

const app = express();

const indexRoutes = require("./routes/indexRoutes")

app.use(express.json());

app.use("/", indexRoutes);

module.exports = app;