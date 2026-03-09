const express = require("express");
const RecordController = require("../../controllers/recordController");

const router = express.Router();

router
  .get("/checkList", RecordController.findCheckList)
  .get("/", RecordController.findAllRecord)
  .get("/find/records/complete", RecordController.findAllRecordsComplete)
  .get("/find/records/pending", RecordController.findAllRecordsPending)
  .get("/:id", RecordController.findOneRecord)
  .get("/placa/:id", RecordController.verifyPlaca)
  .get("/search/placa/:placa", RecordController.alreadyPlaca)
  .get("/status/plate/:id", RecordController.validateStatusPlaca)
  .post('/', RecordController.createRecord)
  .patch('/:id', RecordController.updateRecord)
  .delete('/:id', RecordController.deleteRecord);

module.exports = router