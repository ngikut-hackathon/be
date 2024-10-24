const express = require("express");
const router = express.Router();

const auth = require("./auth.controller");

router.route("/registerUser").post(auth.createUser);

module.exports = router;
