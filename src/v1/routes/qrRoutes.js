const express = require("express");
const QrController = require("../../controllers/qrController");

const router = express.Router();

router
  .get("/", QrController.findAllQrs)
  .get("/:id", QrController.findOneQr)
  .post('/', QrController.createQr)
  .patch('/:id', QrController.updateQr)
  .delete('/:id', QrController.deleteQr);

module.exports = router