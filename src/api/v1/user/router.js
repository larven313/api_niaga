const router = require("express").Router();
const handleValidation = require("../../../middlewares/handleValidation");

const {
  register,
  login,
  getAllUser,
  updateUser,
  deleteUser,
  createUserByAdmin,
} = require("./controller");

const {
  registerValidation,
  loginValidation,
  createUserByAdminValidation,
  updateUserValidation,
  deleteUserValidation,
} = require("./validation");

router.post("/register", registerValidation, handleValidation, register);
router.post("/login", loginValidation, handleValidation, login);

router.post(
  "/users",
  createUserByAdminValidation,
  handleValidation,
  createUserByAdmin
);

router.put("/users/:id", updateUserValidation, handleValidation, updateUser);

router.delete("/users/:id", deleteUserValidation, handleValidation, deleteUser);

router.get("/users", getAllUser);

module.exports = router;
