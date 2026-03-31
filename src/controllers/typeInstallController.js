const TypeInstallService = require("../services/typeInstallService");

const findAllTypes = async (req, res, next) => {
  try {
    const data = await TypeInstallService.find();

    res.status(200).json({
      message: "OK",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const findOne = async (req, res, next) => {
  try {
    const { params: { id } } = req;
    const data = await TypeInstallService.findOne(id);

    res.status(200).json({
      message: 'OK',
      data,
    });
  } catch (error) {
    next(error)
  }
};

const createType = async ( req , res , next ) => {
  try{
    const { body } = req
    console.log(body)
    const data = await TypeInstallService.create(body)

    res.status(201).json({
      message: 'Created',
      data
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const updateType = async (req, res, next) => {
  try {
    const { params: { id }, body } = req
    const data = await TypeInstallService.update(id, body)

    res.status(200).json({
      message: 'Updated',
      data
    })
  } catch (error) {
    next(error)
  }
}

const deleteType = async (req, res, next) => {
  try {
    const { params: { id }} = req
    const data = await TypeInstallService.remove(id)

    res.status(200).json({
      message: 'Deleted',
      data
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
    findAllTypes,
    findOne,
    createType,
    updateType,
    deleteType,
}