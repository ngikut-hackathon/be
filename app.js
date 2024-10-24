const express = require("express");
const nunjucks = require("nunjucks");

app = express();
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});
app.set("view engine", "njk");
app.use(express.json());

const indexRouter = require("./routes/admin/index/index.router");

const indexAPIRouter = require("./routes/clients/index/index.router");

app.use("/", indexRouter);

app.use("/api", indexAPIRouter);

module.exports = app;
