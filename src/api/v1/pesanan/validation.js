const { body } = require("express-validator");

const createPesananValidation = [
  body("tanggal")
    .notEmpty()
    .withMessage("Tanggal wajib diisi")
    .isDate()
    .withMessage("Format tanggal tidak valid"),

  body("total")
    .notEmpty()
    .withMessage("Total wajib diisi")
    .isInt({ min: 1 })
    .withMessage("Total harus berupa angka"),

  body("pelanggan_id")
    .notEmpty()
    .withMessage("Pelanggan wajib diisi")
    .isInt()
    .withMessage("Pelanggan ID harus berupa angka"),
];

const updatePesananValidation = [
  body("tanggal").optional().isDate().withMessage("Format tanggal tidak valid"),

  body("total")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Total harus berupa angka"),
];

module.exports = {
  createPesananValidation,
  updatePesananValidation,
};
