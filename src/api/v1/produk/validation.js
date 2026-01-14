const { check } = require("express-validator");
const jenisProduk = require("../jenis_produk/model.js");

const createProdukValidation = [
  check("nama_barang")
    .notEmpty()
    .withMessage("Nama produk tidak boleh kosong")
    .isLength({ min: 3 })
    .withMessage("Nama produk minimal 3 karakter"),
  check("stok").isNumeric().withMessage("Stok harus berupa angka"),
  check("min_stok").isNumeric().withMessage("Minimal stok harus berupa angka"),
  check("harga").isNumeric().withMessage("Harga harus berupa angka"),
  check("jenis_produk_id")
    .isNumeric()
    .withMessage("Jenis produk id tidak valid")
    .custom(async (value) => {
      const jenis_produk_id = await jenisProduk.findOne({
        where: { id: value },
      });
      if (!jenis_produk_id) throw new Error("Jenis produk ID tidak valid");
    }),
];

const editProdukValidation = [
  check("nama_barang")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Nama produk minimal 3 karakter"),

  check("stok").optional().isNumeric().withMessage("Stok harus berupa angka"),

  check("min_stok")
    .optional()
    .isNumeric()
    .withMessage("Minimal stok harus berupa angka"),

  check("harga").optional().isNumeric().withMessage("Harga harus berupa angka"),

  check("jenis_produk_id")
    .optional()
    .isNumeric()
    .withMessage("Jenis produk id tidak valid")
    .custom(async (value) => {
      if (value) {
        const jenis_produk_id = await jenisProduk.findOne({
          where: { id: value },
        });
        if (!jenis_produk_id) throw new Error("Jenis produk ID tidak valid");
      }
    }),

  // Custom validation untuk file (gambar)
  check("gambar").custom((value, { req }) => {
    const file = req?.files?.gambar;
    if (file) {
      const allowedExt = [".png", ".jpg", ".jpeg"];
      const ext = require("path").extname(file.name).toLowerCase();
      if (!allowedExt.includes(ext)) {
        throw new Error("Format gambar harus png/jpg/jpeg");
      }
      if (file.size > 5_000_000) {
        throw new Error("Ukuran gambar maksimal 5MB");
      }
    }
    return true;
  }),
];

module.exports = {
  createProdukValidation,
  editProdukValidation,
};
