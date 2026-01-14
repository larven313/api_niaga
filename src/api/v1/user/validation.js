const { body, param } = require("express-validator");

/**
 * REGISTER VALIDATION (USER UMUM)
 */
const registerValidation = [
  body("username")
    .notEmpty()
    .withMessage("Username wajib diisi")
    .isLength({ min: 4 })
    .withMessage("Username minimal 4 karakter"),

  body("email").optional().isEmail().withMessage("Email tidak valid"),

  body("password")
    .notEmpty()
    .withMessage("Password wajib diisi")
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter"),

  body("role").optional().isIn(["pelanggan"]).withMessage("Role tidak valid"),
];

/**
 * LOGIN VALIDATION
 */
const loginValidation = [
  body("username").notEmpty().withMessage("Username wajib diisi"),

  body("password").notEmpty().withMessage("Password wajib diisi"),
];

/**
 * CREATE USER BY ADMIN VALIDATION
 */
const createUserByAdminValidation = [
  body("username")
    .notEmpty()
    .withMessage("Username wajib diisi")
    .isLength({ min: 4 })
    .withMessage("Username minimal 4 karakter"),

  body("password")
    .notEmpty()
    .withMessage("Password wajib diisi")
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter"),

  body("email").optional().isEmail().withMessage("Email tidak valid"),

  body("role")
    .optional()
    .isIn(["superadmin", "admin", "pelanggan"])
    .withMessage("Role tidak valid"),

  body("status")
    .optional()
    .isIn(["aktif", "nonaktif"])
    .withMessage("Status tidak valid"),

  // validasi file gambar (jika ada)
  body("gambar").custom((value, { req }) => {
    const file = req?.files?.gambar;
    if (file) {
      const ext = require("path").extname(file.name).toLowerCase();
      const allowedExt = [".png", ".jpg", ".jpeg"];

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

/**
 * UPDATE USER VALIDATION
 */
const updateUserValidation = [
  param("id").notEmpty().withMessage("UUID user wajib diisi"),

  body("username")
    .optional()
    .isLength({ min: 4 })
    .withMessage("Username minimal 4 karakter"),

  body("email").optional().isEmail().withMessage("Email tidak valid"),

  body("role")
    .optional()
    .isIn(["superadmin", "admin", "pelanggan"])
    .withMessage("Role tidak valid"),

  body("status")
    .optional()
    .isIn(["aktif", "nonaktif"])
    .withMessage("Status tidak valid"),

  body("gambar").custom((value, { req }) => {
    const file = req?.files?.gambar;
    if (file) {
      const ext = require("path").extname(file.name).toLowerCase();
      const allowedExt = [".png", ".jpg", ".jpeg"];

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

/**
 * DELETE USER VALIDATION
 */
const deleteUserValidation = [
  param("id").notEmpty().withMessage("UUID user wajib diisi"),
];

module.exports = {
  registerValidation,
  loginValidation,
  createUserByAdminValidation,
  updateUserValidation,
  deleteUserValidation,
};
