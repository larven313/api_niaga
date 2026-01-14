const Kartu = require("./model");
const History = require("../history/model");
const { StatusCodes } = require("http-status-codes");

/**
 * GET ALL KARTU
 */
const getAllKartu = async (req, res, next) => {
  try {
    const data = await Kartu.findAll();

    return res.status(StatusCodes.OK).json({
      msg: "Data kartu berhasil didapatkan",
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET KARTU BY ID
 */
const getKartuById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Kartu.findOne({ where: { uuid: id } });
    if (!data) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "Data kartu tidak ditemukan",
      });
    }

    return res.status(StatusCodes.OK).json({
      msg: "Data kartu berhasil didapatkan",
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * CREATE KARTU
 */
const createKartu = async (req, res, next) => {
  try {
    const { kode, nama, diskon, iuran } = req.body;

    const data = await Kartu.create({
      kode,
      nama,
      diskon,
      iuran,
    });

    await History.create({
      user_id: 1,
      action: "create",
      table: "tbl_kartu",
      value: nama,
    });

    return res.status(StatusCodes.CREATED).json({
      msg: "Kartu berhasil ditambahkan",
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * UPDATE KARTU
 */
const updateKartu = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { kode, nama, diskon, iuran } = req.body;

    const kartu = await Kartu.findByPk(id);
    if (!kartu) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "Data kartu tidak ditemukan",
      });
    }

    await Kartu.update({ kode, nama, diskon, iuran }, { where: { id } });

    await History.create({
      user_id: 1,
      action: "update",
      table: "tbl_kartu",
      value: nama,
    });

    const updatedData = await Kartu.findByPk(id);

    return res.status(StatusCodes.OK).json({
      msg: "Kartu berhasil diupdate",
      data: updatedData,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE KARTU
 */
const deleteKartu = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Kartu.findByPk(id);
    if (!data) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "Data kartu tidak ditemukan",
      });
    }

    await Kartu.destroy({ where: { id } });

    return res.status(StatusCodes.OK).json({
      msg: "Kartu berhasil dihapus",
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllKartu,
  getKartuById,
  createKartu,
  updateKartu,
  deleteKartu,
};
