const route = require("express").Router();
const {
  getAllProduk,
  getProdukByUUID,
  createProduk,
  editProduk,
  deleteProduk,
} = require("./controller.js");
const {
  createProdukValidation,
  editProdukValidation,
} = require("./validation.js");
const handleValidation = require("../../../middlewares/handleValidation.js");

route.get("/produk", getAllProduk);
route.get("/produk/:id", getProdukByUUID);
route.post(
  "/produk",

  createProdukValidation,
  handleValidation,
  createProduk
);
route.put(
  "/produk/:id",

  editProdukValidation,
  handleValidation,
  editProduk
);
route.delete("/produk/:id", deleteProduk);

module.exports = route;
