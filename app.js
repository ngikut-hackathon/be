const express = require("express");
const nunjucks = require("nunjucks");

app = express();
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});
app.set("view engine", "njk");

const indexRouter = require("./routes/index/index.router");

const indexAPIRouter = require("./routes/index/index.api.router");

app.use("/", indexRouter);

app.use("/api", indexAPIRouter);

module.exports = app;
