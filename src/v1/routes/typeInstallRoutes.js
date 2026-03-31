const express = require("express");
const TypeInstallController = require("../../controllers/typeInstallController");

const router = express.Router();

router
  .get("/", TypeInstallController.findAllTypes)
  .get("/:id", TypeInstallController.findOne)
  .post('/',TypeInstallController.createType)
  .patch('/:id', TypeInstallController.updateType)
  .delete('/:id', TypeInstallController.deleteType)
module.exports = router