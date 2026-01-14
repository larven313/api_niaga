const route = require("express").Router();
const {
  getAllJenisProduk,
  getJenisProdukByUUID,
  createJenisProduk,
  editJenisProduk,
  deleteJenisProduk,
} = require("./controller.js");
const {
  createJenisProdukValidation,
  editJenisProdukValidation,
} = require("./validation.js");
const handleValidation = require("../../../middlewares/handleValidation.js");

route.get("/jenis-produk", getAllJenisProduk);
route.get("/jenis-produk/:id", getJenisProdukByUUID);
route.post(
  "/jenis-produk",

  createJenisProdukValidation,
  handleValidation,
  createJenisProduk
);
route.put(
  "/jenis-produk/:id",

  editJenisProdukValidation,
  handleValidation,
  editJenisProduk
);
route.delete("/jenis-produk/:id", deleteJenisProduk);

module.exports = route;
