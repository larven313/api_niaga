const router = require("express").Router();

const {
  getAllKartu,
  getKartuById,
  createKartu,
  updateKartu,
  deleteKartu,
} = require("./controller");

const {
  createKartuValidation,
  updateKartuValidation,
} = require("./validation");

const handleValidation = require("../../../middlewares/handleValidation");

/**
 * KARTU ROUTES
 */
router.get("/kartu", getAllKartu);
router.get("/kartu/:id", getKartuById);

router.post("/kartu", createKartuValidation, handleValidation, createKartu);

router.put("/kartu/:id", updateKartuValidation, handleValidation, updateKartu);

router.delete("/kartu/:id", deleteKartu);

module.exports = router;
