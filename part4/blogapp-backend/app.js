const config = require("./utils/config");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose
  .connect(config.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.log("error connection to MongoDB:", error.message);
  });

app.use(express.static("build"));
app.use(bodyParser.json());
app.use(middleware.tokenExtractor);
app.use(middleware.requestLogger);
app.use(cors());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
