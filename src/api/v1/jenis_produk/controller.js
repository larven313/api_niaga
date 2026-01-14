const path = require("path");
const sharp = require("sharp");
const JenisProduk = require("./model.js");
const History = require("../history/model.js");
const { StatusCodes } = require("http-status-codes");

const getAllJenisProduk = async (req, res, next) => {
  try {
    const data_jenis_produk = await JenisProduk.findAll();
    return res.status(StatusCodes.OK).json({
      msg: "Data berhasil didapatkan",
      data: data_jenis_produk,
    });
  } catch (error) {
    next(error);
  }
};

const getJenisProdukByUUID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await JenisProduk.findOne({ where: { uuid: id } });

    if (!result) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Data tidak ditemukan" });
    }

    return res.status(StatusCodes.OK).json({
      msg: "Data berhasil didapatkan",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const createJenisProduk = async (req, res, next) => {
  try {
    const { nama } = req.body;
    let fileName = "default.png";
    let url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    const file = req?.files?.gambar;
    if (file) {
      const ext = path.extname(file.name).toLowerCase();
      const allowedExt = [".png", ".jpg", ".jpeg"];
      if (!allowedExt.includes(ext)) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "Format gambar tidak valid" });
      }

      if (file.size > 5_000_000) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "Ukuran gambar maksimal 5MB" });
      }

      fileName = `${file.md5}${ext}`;
      const compressedPath = path.join("public/images", fileName);
      const sharpInstance = sharp(file.data).resize(800);

      if (ext === ".png") {
        await sharpInstance.png({ quality: 80 }).toFile(compressedPath);
      } else {
        await sharpInstance.jpeg({ quality: 70 }).toFile(compressedPath);
      }

      url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    }

    const jenis_produk = await JenisProduk.create({
      nama,
      gambar: fileName,
      url,
    });

    if (jenis_produk) {
      await History.create({
        user_id: 1,
        action: "create",
        table: "tbl_jenis_produk",
        value: nama,
      });
    }

    return res.status(StatusCodes.CREATED).json({
      msg: "Jenis produk berhasil dibuat",
      data: jenis_produk,
    });
  } catch (error) {
    next(error);
  }
};

const editJenisProduk = async (req, res, next) => {
  try {
    const nama = req.body?.nama;
    const { id } = req.params;

    const match_jenis_produk = await JenisProduk.findOne({
      where: { uuid: id },
    });
    if (!match_jenis_produk) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Data tidak ditemukan" });
    }

    let fileName = match_jenis_produk.gambar;
    let url = match_jenis_produk.url;

    const file = req?.files?.gambar;
    if (file) {
      const ext = path.extname(file.name).toLowerCase();
      const allowedExt = [".png", ".jpg", ".jpeg"];
      if (!allowedExt.includes(ext)) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "Format gambar tidak valid" });
      }

      if (file.size > 5_000_000) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "Ukuran gambar maksimal 5MB" });
      }

      fileName = `${file.md5}${ext}`;
      const compressedPath = path.join("public/images", fileName);
      const sharpInstance = sharp(file.data).resize(800);

      if (ext === ".png") {
        await sharpInstance.png({ quality: 80 }).toFile(compressedPath);
      } else {
        await sharpInstance.jpeg({ quality: 70 }).toFile(compressedPath);
      }

      url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    }

    await JenisProduk.update(
      { nama: nama ?? match_jenis_produk.nama, gambar: fileName, url },
      { where: { uuid: id } }
    );

    const updatedData = await JenisProduk.findOne({ where: { uuid: id } });

    return res.status(StatusCodes.OK).json({
      msg: "Data berhasil diubah",
      data: updatedData,
    });
  } catch (error) {
    next(error);
  }
};

const deleteJenisProduk = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dataJenisProduk = await JenisProduk.findOne({ where: { uuid: id } });

    if (!dataJenisProduk) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Data tidak ditemukan" });
    }

    await JenisProduk.destroy({ where: { uuid: id } });

    return res.status(StatusCodes.OK).json({
      msg: "Data berhasil dihapus",
      data: dataJenisProduk,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllJenisProduk,
  createJenisProduk,
  editJenisProduk,
  deleteJenisProduk,
  getJenisProdukByUUID,
};
