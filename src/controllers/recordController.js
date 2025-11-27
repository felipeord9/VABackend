const RecordService = require("../services/recordService");

const findCheckList = async (req, res, next) => {
  try {
    const data = await RecordService.findAll();

    res.status(200).json({
      message: "OK",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const findAllRecord = async (req, res, next) => {
  try {
    const data = await RecordService.find();

    res.status(200).json({
      message: "OK",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const findAllRecordsComplete = async (req, res, next) => {
  try {
    const data = await RecordService.findComplete();

    res.status(200).json({
      message: "OK",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const findAllRecordsPending = async (req, res, next) => {
  try {
    const data = await RecordService.findPending();

    res.status(200).json({
      message: "OK",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const findOneRecord = async (req, res, next) => {
  try {
    const { params: { id } } = req;
    const data = await RecordService.findOne(id);

    res.status(200).json({
      message: 'OK',
      data
    })
  } catch (error) {
    next(error)
  }
};

const verifyPlaca = async (req, res, next) => {
  try {
    const { params: { id } } = req;
    const data = await RecordService.verify(id);

    res.status(200).json({
      message: 'OK',
      data
    })
  } catch (error) {
    next(error)
  }
};


const createRecord = async (req, res, next) => {
  try {
    const { body } = req
    console.log(body)
    const data = await RecordService.create(body)
    
    res.status(201).json({
      message: 'Created',
      data
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const updateRecord = async (req, res, next) => {
  try {
    const { params: { id }, body } = req
    const data = await RecordService.update(id, body)

    res.status(200).json({
      message: 'Updated',
      data
    })
  } catch (error) {
    next(error)
  }
}

const deleteRecord = async (req, res, next) => {
  try {
    const { params: { id }} = req
    const data = await RecordService.remove(id)

    res.status(200).json({
      message: 'Deleted',
      data
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  findCheckList,
  findAllRecord,
  findAllRecordsComplete,
  findAllRecordsPending,
  findOneRecord,
  verifyPlaca,
  createRecord,
  updateRecord,
  deleteRecord
};