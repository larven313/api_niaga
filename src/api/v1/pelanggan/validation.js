const { check } = require("express-validator");

/**
 * CREATE PELANGGAN VALIDATION
 */
const createPelangganValidation = [
  check("nama")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Nama minimal 3 karakter"),

  check("gender")
    .notEmpty()
    .withMessage("Gender wajib diisi")
    .isIn(["L", "P"])
    .withMessage("Gender harus L (Laki-laki) atau P (Perempuan)"),

  check("no_hp")
    .notEmpty()
    .withMessage("No HP wajib diisi")
    .isLength({ min: 8, max: 20 })
    .withMessage("No HP tidak valid"),

  check("alamat")
    .optional()
    .isLength({ min: 5 })
    .withMessage("Alamat minimal 5 karakter"),

  check("tgl_lahir")
    .notEmpty()
    .withMessage("Tanggal lahir wajib diisi")
    .isDate()
    .withMessage("Format tanggal lahir tidak valid (YYYY-MM-DD)"),

  check("user_id")
    .optional()
    .isNumeric()
    .withMessage("User ID harus berupa angka"),

  check("kartu_id")
    .optional()
    .isNumeric()
    .withMessage("Kartu ID harus berupa angka"),
];

/**
 * UPDATE PELANGGAN VALIDATION
 */
const updatePelangganValidation = [
  check("nama")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Nama minimal 3 karakter"),

  check("gender")
    .optional()
    .isIn(["L", "P"])
    .withMessage("Gender harus L (Laki-laki) atau P (Perempuan)"),

  check("no_hp")
    .optional()
    .isLength({ min: 8, max: 20 })
    .withMessage("No HP tidak valid"),

  check("alamat")
    .optional()
    .isLength({ min: 5 })
    .withMessage("Alamat minimal 5 karakter"),

  check("tgl_lahir")
    .optional()
    .isDate()
    .withMessage("Format tanggal lahir tidak valid (YYYY-MM-DD)"),

  check("user_id")
    .optional()
    .isNumeric()
    .withMessage("User ID harus berupa angka"),

  check("kartu_id")
    .optional()
    .isNumeric()
    .withMessage("Kartu ID harus berupa angka"),
];

module.exports = {
  createPelangganValidation,
  updatePelangganValidation,
};
