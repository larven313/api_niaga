const Pelanggan = require("./model");
const History = require("../history/model");
const { StatusCodes } = require("http-status-codes");
const User = require("../user/model");

/**
 * GET ALL PELANGGAN
 */
const getAllPelanggan = async (req, res, next) => {
  try {
    const data = await Pelanggan.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username", "email", "role", "status", "url"],
        },
      ],
    });
    return res.status(StatusCodes.OK).json({
      msg: "Data pelanggan berhasil didapatkan",
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET PELANGGAN BY UUID
 */
const getPelangganByUUID = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Pelanggan.findOne({ where: { uuid: id } });
    if (!data) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "Data pelanggan tidak ditemukan",
      });
    }

    return res.status(StatusCodes.OK).json({
      msg: "Data pelanggan berhasil didapatkan",
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * CREATE PELANGGAN
 */
const createPelanggan = async (req, res, next) => {
  try {
    const { nama, gender, no_hp, alamat, tgl_lahir, user_id, kartu_id } =
      req.body;

    const data = await Pelanggan.create({
      nama,
      gender,
      no_hp,
      alamat,
      tgl_lahir,
      user_id,
      kartu_id,
    });

    await History.create({
      user_id: user_id || 1,
      action: "create",
      table: "tbl_pelanggan",
      value: nama,
    });

    return res.status(StatusCodes.CREATED).json({
      msg: "Pelanggan berhasil ditambahkan",
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * UPDATE PELANGGAN
 */
const updatePelanggan = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nama, gender, no_hp, alamat, tgl_lahir, user_id, kartu_id } =
      req.body;

    const pelanggan = await Pelanggan.findOne({ where: { uuid: id } });
    if (!pelanggan) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "Data pelanggan tidak ditemukan",
      });
    }

    await Pelanggan.update(
      { nama, gender, no_hp, alamat, tgl_lahir, user_id, kartu_id },
      { where: { id } }
    );

    await History.create({
      user_id: user_id || 1,
      action: "update",
      table: "tbl_pelanggan",
      value: nama,
    });

    const updatedData = await Pelanggan.findOne({ where: { uuid: id } });

    return res.status(StatusCodes.OK).json({
      msg: "Pelanggan berhasil diupdate",
      data: updatedData,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE PELANGGAN
 */
const deletePelanggan = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Pelanggan.findOne({ where: { uuid: id } });
    if (!data) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "Data pelanggan tidak ditemukan",
      });
    }

    await Pelanggan.destroy({ where: { uuid: id } });

    return res.status(StatusCodes.OK).json({
      msg: "Pelanggan berhasil dihapus",
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPelanggan,
  getPelangganByUUID,
  createPelanggan,
  updatePelanggan,
  deletePelanggan,
};
