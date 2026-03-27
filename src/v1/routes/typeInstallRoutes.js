const express = require("express");
const TypeInstallController = require("../../controllers/typeInstallController");

const router = express.Router();

router
  .get("/", TypeInstallController.findAllTypes);

module.exports = router