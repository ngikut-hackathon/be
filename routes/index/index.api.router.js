const express = require("express");
const router = express.Router();

const index = require("./index.api.controller");

router.route("/").get(index.getIndexAPI);

module.exports = router;
