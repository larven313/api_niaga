const { body } = require("express-validator");

const createKartuValidation = [
  body("kode")
    .notEmpty()
    .withMessage("Kode kartu wajib diisi")
    .isLength({ min: 2, max: 4 })
    .withMessage("Kode kartu 2–4 karakter"),

  body("nama")
    .notEmpty()
    .withMessage("Nama kartu wajib diisi")
    .isLength({ min: 3 })
    .withMessage("Nama kartu minimal 3 karakter"),

  body("diskon")
    .optional()
    .isNumeric()
    .withMessage("Diskon harus berupa angka"),

  body("iuran").optional().isNumeric().withMessage("Iuran harus berupa angka"),
];

const updateKartuValidation = [
  body("kode")
    .optional()
    .isLength({ min: 2, max: 4 })
    .withMessage("Kode kartu 2–4 karakter"),

  body("nama")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Nama kartu minimal 3 karakter"),

  body("diskon")
    .optional()
    .isNumeric()
    .withMessage("Diskon harus berupa angka"),

  body("iuran").optional().isNumeric().withMessage("Iuran harus berupa angka"),
];

module.exports = {
  createKartuValidation,
  updateKartuValidation,
};
