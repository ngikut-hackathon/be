const express = require("express");
const router = express.Router();

const index = require("./index.controller");

router.route("/").get(index.getIndexPage);

module.exports = router;
