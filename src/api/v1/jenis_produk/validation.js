const { check } = require("express-validator");
const JenisProduk = require("./model");

const createJenisProdukValidation = [
  check("nama")
    .notEmpty()
    .withMessage("Nama jenis produk tidak boleh kosong")
    .isLength({ min: 3 })
    .withMessage("Nama jenis produk minimal 3 karakter")
    .custom(async (value) => {
      const exist = await JenisProduk.findOne({
        where: {
          nama: value,
        },
      });
      if (exist) {
        throw new Error("Nama jenis produk sudah ada");
      }
      return true;
    }),
];

const editJenisProdukValidation = [
  check("nama")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Nama jenis produk minimal 3 karakter"),
];

module.exports = {
  createJenisProdukValidation,
  editJenisProdukValidation,
};
