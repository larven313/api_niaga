const router = require("express").Router();

const {
  getAllPesananItems,
  getPesananItemById,
  createPesananItem,
  updatePesananItem,
  deletePesananItem,
} = require("./controller");

const {
  createPesananItemValidation,
  updatePesananItemValidation,
} = require("./validation");

const handleValidation = require("../../../middlewares/handleValidation");

/**
 * PESANAN ITEMS ROUTES
 */
router.get("/pesanan-items", getAllPesananItems);
router.get("/pesanan-items/:id", getPesananItemById);

router.post(
  "/pesanan-items",
  createPesananItemValidation,
  handleValidation,
  createPesananItem
);

router.put(
  "/pesanan-items/:id",
  updatePesananItemValidation,
  handleValidation,
  updatePesananItem
);

router.delete("/pesanan-items/:id", deletePesananItem);

module.exports = router;
