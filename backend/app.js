require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
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
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use("/api/auth", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/quiz", quizRoutes);

module.exports = app;
