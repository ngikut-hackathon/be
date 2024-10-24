const express = require("express");
const router = express.Router();

const index = require("./index.controller");

router.route("/").get(index.getIndexAPI);

router.route("/registerUser").post(index.createUser);

router.route("/createReport").post(index.createReport);

router.route("/getAllReport").get(index.getAllReports);

router.route("/getReportByID").get(index.getReportByID);

module.exports = router;
