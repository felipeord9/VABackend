const QrService = require("../services/qrService");

const findAllQrs = async (req, res, next) => {
  try {
    const data = await QrService.find();

    res.status(200).json({
      message: "OK",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const findOneQr = async (req, res, next) => {
  try {
    const { params: { id } } = req;
    const data = await QrService.findOne(id);

    res.status(200).json({
      message: 'OK',
      data
    })
  } catch (error) {
    next(error)
  }
};

const createQr = async (req, res, next) => {
  try {
    const { body } = req
    console.log(body)
    const data = await QrService.create({
      numFactura: body.numFactura,
      razonSocial: body.razonSocial,
      refProduct: body.refProduct,
      descriProduct: body.descriProduct,
      cantidad: body.cantidad,
      arriveDate: body.arriveDate,
      observations: body.observations,
      createdBy: body.createdBy,
      createdAt: body.createdAt,
    })
    
    res.status(201).json({
      message: 'Created',
      data
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const updateQr = async (req, res, next) => {
  try {
    const { params: { id }, body } = req
    const data = await QrService.update(id, body)

    res.json(200).json({
      message: 'Updated',
      data
    })
  } catch (error) {
    next(error)
  }
}

const deleteQr = async (req, res, next) => {
  try {
    const { params: { id }} = req
    const data = await QrService.remove(id)

    res.status(200).json({
      message: 'Deleted',
      data
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  findAllQrs,
  findOneQr,
  createQr,
  updateQr,
  deleteQr
};