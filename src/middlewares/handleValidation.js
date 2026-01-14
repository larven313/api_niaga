const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Validasi gagal!",
      errors: errors.array(),
    });
  }
  next();
};

module.exports = handleValidation;
