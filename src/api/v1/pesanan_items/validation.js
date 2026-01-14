const { body } = require("express-validator");

const createPesananItemValidation = [
  body("barang_id")
    .notEmpty()
    .withMessage("Barang wajib diisi")
    .isInt()
    .withMessage("Barang ID harus berupa angka"),

  body("pesanan_id")
    .notEmpty()
    .withMessage("Pesanan wajib diisi")
    .isInt()
    .withMessage("Pesanan ID harus berupa angka"),

  body("qty")
    .notEmpty()
    .withMessage("Qty wajib diisi")
    .isInt({ min: 1 })
    .withMessage("Qty minimal 1"),

  body("harga")
    .notEmpty()
    .withMessage("Harga wajib diisi")
    .isNumeric()
    .withMessage("Harga harus berupa angka"),
];

const updatePesananItemValidation = [
  body("qty").optional().isInt({ min: 1 }).withMessage("Qty minimal 1"),

  body("harga").optional().isNumeric().withMessage("Harga harus berupa angka"),
];

module.exports = {
  createPesananItemValidation,
  updatePesananItemValidation,
};
