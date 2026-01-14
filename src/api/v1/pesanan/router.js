const router = require("express").Router();

const {
  getAllPesanan,
  getPesananByUUID,
  createPesanan,
  updatePesanan,
  deletePesanan,
} = require("./controller");

const {
  createPesananValidation,
  updatePesananValidation,
} = require("./validation");

const handleValidation = require("../../../middlewares/handleValidation");

/**
 * PESANAN ROUTES
 */
router.get("/pesanan", getAllPesanan);
router.get("/pesanan/:id", getPesananByUUID);

router.post(
  "/pesanan",
  createPesananValidation,
  handleValidation,
  createPesanan
);

router.put(
  "/pesanan/:id",
  updatePesananValidation,
  handleValidation,
  updatePesanan
);

router.delete("/pesanan/:id", deletePesanan);

module.exports = router;
