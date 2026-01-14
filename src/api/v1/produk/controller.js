const Produk = require("./model.js");
const History = require("../history/model.js");
const { StatusCodes } = require("http-status-codes");
const path = require("path");
const sharp = require("sharp");
const fs = require("fs");

const getAllProduk = async (req, res, next) => {
  try {
    const data_produk = await Produk.findAll();
    return res.status(StatusCodes.OK).json({
      msg: "Data berhasil didapatkan",
      data: data_produk,
    });
  } catch (error) {
    next(error);
  }
};

const getProdukByUUID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Produk.findOne({
      where: {
        uuid: id,
      },
    });

    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "Data tidak ditemukan",
      });
    }

    return res.status(StatusCodes.OK).json({
      msg: "Data berhasil didapatkan",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const createProduk = async (req, res, next) => {
  try {
    const { nama_barang, stok, min_stok, harga, jenis_produk_id } = req.body;

    // default value
    let fileName = "default.png";
    let url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    let file = req?.files?.gambar;
    if (file) {
      const ext = path.extname(file.name).toLowerCase();
      const allowedExt = [".png", ".jpg", ".jpeg"];
      if (!allowedExt.includes(ext)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          msg: "Format gambar tidak valid",
        });
      }

      if (file.size > 5_000_000) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          msg: "Ukuran gambar maksimal 5MB",
        });
      }

      // nama file unik
      fileName = `${file.md5}${ext}`;
      // const originalPath = path.join("public/images", "original_" + fileName);
      const compressedPath = path.join("public/images", fileName);

      // simpan file asli sementara
      // await file.mv(originalPath);

      // kompres gambar menggunakan sharp
      const sharpInstance = sharp(file.data).resize(800);

      if (ext == ".png") {
        await sharpInstance.png({ quality: 80 }).toFile(compressedPath);
      } else {
        await sharpInstance
          .jpeg({ quality: 70 }) // kompres kualitas 70%
          .toFile(compressedPath);
      }

      // hapus gambar original
      // fs.unlink(originalPath);

      url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    }

    const data_produk = await Produk.create({
      nama_barang,
      stok,
      min_stok,
      harga,
      jenis_produk_id,
      gambar: fileName,
      url,
    });

    return res.status(StatusCodes.CREATED).json({
      msg: "Produk berhasil dibuat",
      data: data_produk,
    });
  } catch (error) {
    next(error);
  }
};

const editProduk = async (req, res, next) => {
  try {
    const { nama_barang, stok, min_stok, harga, jenis_produk_id } = req.body;
    const { id } = req.params;

    // Cari data produk berdasarkan UUID
    const produk = await Produk.findOne({ where: { uuid: id } });
    if (!produk) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "Data tidak ditemukan",
      });
    }

    // default gunakan gambar lama
    let fileName = produk.gambar;
    let url = produk.url;

    // jika user upload gambar baru
    let file = req?.files?.gambar;
    if (file) {
      const ext = path.extname(file.name).toLowerCase();
      const allowedExt = [".png", ".jpg", ".jpeg"];
      if (!allowedExt.includes(ext)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          msg: "Format gambar tidak valid",
        });
      }

      if (file.size > 5_000_000) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          msg: "Ukuran gambar maksimal 5MB",
        });
      }

      // Hapus gambar lama jika bukan default
      if (produk.gambar && produk.gambar !== "default.png") {
        const oldImagePath = path.join(
          __dirname,
          "../../../../public/images",
          produk.gambar
        );

        try {
          if (
            fs.existsSync(oldImagePath) &&
            fs.lstatSync(oldImagePath).isFile()
          ) {
            fs.unlinkSync(oldImagePath);
            console.log("Gambar lama dihapus:", oldImagePath);
          }
        } catch (err) {
          console.error("Gagal menghapus gambar lama:", err.message);
        }
      }

      // buat nama file baru
      fileName = `${file.md5}${ext}`;
      const compressedPath = path.join("public/images", fileName);

      // kompres gambar
      const sharpInstance = sharp(file.data).resize(800);
      if (ext === ".png") {
        await sharpInstance.png({ quality: 80 }).toFile(compressedPath);
      } else {
        await sharpInstance.jpeg({ quality: 70 }).toFile(compressedPath);
      }

      // buat url baru
      url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    }

    // Update produk
    await Produk.update(
      {
        nama_barang,
        stok,
        min_stok,
        harga,
        jenis_produk_id,
        gambar: fileName,
        url,
      },
      { where: { uuid: id } }
    );

    const updatedData = await Produk.findOne({ where: { uuid: id } });

    return res.status(StatusCodes.OK).json({
      msg: "Produk berhasil diupdate",
      data: updatedData,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduk = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dataProduk = await Produk.findOne({
      where: {
        uuid: id,
      },
    });

    if (!dataProduk) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "Data tidak ditemukan",
      });
    }

    await Produk.destroy({
      where: {
        uuid: id,
      },
    });

    return res.status(StatusCodes.OK).json({
      msg: "Data berhasil dihapus",
      data: dataProduk,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProduk,
  createProduk,
  editProduk,
  deleteProduk,
  getProdukByUUID,
};
