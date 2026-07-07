const express = require("express");

const app = express();

const indexRoutes = require("./routes/indexRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(express.json());

app.use("/", indexRoutes);
app.use("/auth", authRoutes);

module.exports = app;