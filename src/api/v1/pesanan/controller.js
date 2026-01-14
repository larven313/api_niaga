const Pesanan = require("./model");
const Pelanggan = require("../pelanggan/model");
const History = require("../history/model");
const { StatusCodes } = require("http-status-codes");

/**
 * GET ALL PESANAN
 */
const getAllPesanan = async (req, res, next) => {
  try {
    const data = await Pesanan.findAll({
      include: [
        {
          model: Pelanggan,
          as: "pelanggan",
          attributes: ["nama", "no_hp"],
        },
      ],
    });

    return res.status(StatusCodes.OK).json({
      msg: "Data pesanan berhasil didapatkan",
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET PESANAN BY UUID
 */
const getPesananByUUID = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Pesanan.findOne({
      where: { uuid: id },
    });

    if (!data) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "Data pesanan tidak ditemukan",
      });
    }

    return res.status(StatusCodes.OK).json({
      msg: "Data pesanan berhasil didapatkan",
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * CREATE PESANAN
 */
const createPesanan = async (req, res, next) => {
  try {
    const { tanggal, total, pelanggan_id } = req.body;

    const pelanggan = await Pelanggan.findOne({
      where: { id: pelanggan_id },
    });

    if (!pelanggan) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "Pelanggan tidak ditemukan",
      });
    }

    const data = await Pesanan.create({
      tanggal,
      total,
      pelanggan_id,
    });

    await History.create({
      user_id: 1,
      action: "create",
      table: "tbl_pesanan",
      value: `Pesanan ${data.uuid}`,
    });

    return res.status(StatusCodes.CREATED).json({
      msg: "Pesanan berhasil ditambahkan",
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * UPDATE PESANAN
 */
const updatePesanan = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { tanggal, total } = req.body;

    const pesanan = await Pesanan.findOne({ where: { uuid: id } });
    if (!pesanan) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "Data pesanan tidak ditemukan",
      });
    }

    await Pesanan.update({ tanggal, total }, { where: { uuid: id } });

    await History.create({
      user_id: 1,
      action: "update",
      table: "tbl_pesanan",
      value: `Pesanan ${id}`,
    });

    const updatedData = await Pesanan.findOne({ where: { uuid: id } });

    return res.status(StatusCodes.OK).json({
      msg: "Pesanan berhasil diupdate",
      data: updatedData,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE PESANAN
 */
const deletePesanan = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Pesanan.findOne({ where: { uuid: id } });
    if (!data) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "Data pesanan tidak ditemukan",
      });
    }

    await Pesanan.destroy({ where: { uuid: id } });

    return res.status(StatusCodes.OK).json({
      msg: "Pesanan berhasil dihapus",
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPesanan,
  getPesananByUUID,
  createPesanan,
  updatePesanan,
  deletePesanan,
};
