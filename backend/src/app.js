const express = require("express");

const app = express();

const indexRoutes = require("./routes/indexRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(express.json());

app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

module.exports = app;