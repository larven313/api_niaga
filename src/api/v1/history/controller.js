const History = require("./model.js");
const { StatusCodes } = require("http-status-codes");

const getAllHistory = async (req, res, next) => {
  try {
    const result = await History.findAll();
    return res.status(StatusCodes.OK).json({
      msg: "History berhasil didapatkan",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteHistory = async (req, res, next) => {
  try {
    const { id } = req.params();
    const result = await History.destroy({
      where: { uuid: id },
    });
    return res.status(StatusCodes.OK).json({
      msg: "Berhasil menghapus history",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllHistory,
  deleteHistory,
};
