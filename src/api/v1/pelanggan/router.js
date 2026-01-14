const router = require("express").Router();

const {
  getAllPelanggan,
  getPelangganByUUID,
  createPelanggan,
  updatePelanggan,
  deletePelanggan,
} = require("./controller");

const {
  createPelangganValidation,
  updatePelangganValidation,
} = require("./validation");

const handleValidation = require("../../../middlewares/handleValidation");

/**
 * PELANGGAN ROUTES
 */
router.get("/pelanggan", getAllPelanggan);
router.get("/pelanggan/:id", getPelangganByUUID);

router.post(
  "/pelanggan",
  createPelangganValidation,
  handleValidation,
  createPelanggan
);

router.put(
  "/pelanggan/:id",
  updatePelangganValidation,
  handleValidation,
  updatePelanggan
);

router.delete("/pelanggan/:id", deletePelanggan);

module.exports = router;
