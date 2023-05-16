require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/user");
const quizRoutes = require("./routes/quiz");
const path = require("path");
const connectDB = require("./middlewares/connectDB");
const cors = require("./middlewares/cors");

const app = express();
connectDB();

app.use(cors);
app.get("/ping", function (req, res) {
  res.send("pong");
});
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/quiz", quizRoutes);

module.exports = app;
