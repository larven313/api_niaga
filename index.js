const express = require("express");
const fileUpload = require("express-fileupload");

// ⛔ dotenv JANGAN dipanggil langsung di production
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const sequelize = require("./src/config/db.js");
require("./src/api/v1/models");

const app = express();
const PORT = process.env.PORT || 3000;

// =====================
// Middleware
// =====================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static("public"));

// =====================
// Routers
// =====================
app.use("/api/v1", require("./src/api/v1/jenis_produk/router.js"));
app.use("/api/v1", require("./src/api/v1/produk/router.js"));
app.use("/api/v1", require("./src/api/v1/pelanggan/router.js"));
app.use("/api/v1", require("./src/api/v1/pesanan/router.js"));
app.use("/api/v1", require("./src/api/v1/pesanan_items/router.js"));
app.use("/api/v1", require("./src/api/v1/kartu/router.js"));
app.use("/api/v1", require("./src/api/v1/history/router.js"));
app.use("/api/v1", require("./src/api/v1/user/router.js"));

// =====================
// Root
// =====================
app.get("/", (req, res) => {
  res.json({ message: "API Toko dengan JWT" });
});

// =====================
// Error Handler (harus di bawah)
// =====================
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    msg: "Terjadi kesalahan server",
    error:
      process.env.NODE_ENV === "development"
        ? err.message || err.stack
        : undefined,
  });
});

// =====================
// Server Start
// =====================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
