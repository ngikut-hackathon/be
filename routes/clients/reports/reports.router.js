const express = require("express");
const router = express.Router();

const report = require('./reports.controller');

router.route("/createReport").post(report.createReport);

router.route("/getAllReport").get(report.getAllReports);

router.route("/getReportByID/:id").get(report.getReportByID);

module.exports = router;