const PesananItem = require("./model");
const History = require("../history/model");
const { StatusCodes } = require("http-status-codes");

/**
 * GET ALL PESANAN ITEMS
 */
const getAllPesananItems = async (req, res, next) => {
  try {
    const data = await PesananItem.findAll();

    return res.status(StatusCodes.OK).json({
      msg: "Data item pesanan berhasil didapatkan",
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET PESANAN ITEM BY ID
 */
const getPesananItemById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await PesananItem.findOne({
      where: { uuid: id },
    });
    if (!data) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "Data item pesanan tidak ditemukan",
      });
    }

    return res.status(StatusCodes.OK).json({
      msg: "Data item pesanan berhasil didapatkan",
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * CREATE PESANAN ITEM
 */
const createPesananItem = async (req, res, next) => {
  try {
    const { barang_id, pesanan_id, qty, harga } = req.body;

    const data = await PesananItem.create({
      barang_id,
      pesanan_id,
      qty,
      harga,
    });

    await History.create({
      user_id: 1,
      action: "create",
      table: "tbl_pesanan_items",
      value: `Pesanan ID ${pesanan_id}`,
    });

    return res.status(StatusCodes.CREATED).json({
      msg: "Item pesanan berhasil ditambahkan",
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * UPDATE PESANAN ITEM
 */
const updatePesananItem = async (req, res, next) => {
  try {
    const { id } = req.params; // ini UUID
    const { qty, harga } = req.body;

    const item = await PesananItem.findOne({
      where: { uuid: id },
    });

    if (!item) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "Data item pesanan tidak ditemukan",
      });
    }

    await item.update({ qty, harga });

    await History.create({
      user_id: 1,
      action: "update",
      table: "tbl_pesanan_items",
      value: `Item ${item.uuid}`,
    });

    return res.status(StatusCodes.OK).json({
      msg: "Item pesanan berhasil diupdate",
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE PESANAN ITEM
 */
const deletePesananItem = async (req, res, next) => {
  try {
    const { id } = req.params; // UUID

    const data = await PesananItem.findOne({
      where: { uuid: id },
    });

    if (!data) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "Data item pesanan tidak ditemukan",
      });
    }

    await PesananItem.destroy({
      where: { uuid: id },
    });

    return res.status(StatusCodes.OK).json({
      msg: "Item pesanan berhasil dihapus",
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPesananItems,
  getPesananItemById,
  createPesananItem,
  updatePesananItem,
  deletePesananItem,
};
