const cors = require("cors");
const express = require("express");

const app = express();

const indexRoutes = require("./routes/indexRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(cors());
app.use(express.json());

app.use("/api", indexRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

module.exports = app;