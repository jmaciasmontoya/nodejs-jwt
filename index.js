const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

// import routes
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const verifyToken = require("./routes/validate-token");

// middlewares
app.use(express.json()); // for body parser

// route middlewares
app.use("/api/user", authRoutes);

// this route is protected with token
app.use("/api/dashboard", verifyToken, dashboardRoutes);

app.listen(3000, () => console.log("server is running..."));
