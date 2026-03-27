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

module.exports = {
    findAllTypes
}