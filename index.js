const express = require("express");
const fileUpload = require("express-fileupload");

// Load dotenv hanya di local
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

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
// Root (WAJIB ADA & CEPAT)
// =====================
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "API Toko berjalan",
  });
});

// =====================
// Routers
// =====================
app.use("/api/v1", require("./src/api/v1/jenis_produk/router"));
app.use("/api/v1", require("./src/api/v1/produk/router"));
app.use("/api/v1", require("./src/api/v1/pelanggan/router"));
app.use("/api/v1", require("./src/api/v1/pesanan/router"));
app.use("/api/v1", require("./src/api/v1/pesanan_items/router"));
app.use("/api/v1", require("./src/api/v1/kartu/router"));
app.use("/api/v1", require("./src/api/v1/history/router"));
app.use("/api/v1", require("./src/api/v1/user/router"));

// =====================
// Error Handler (paling bawah)
// =====================
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err);
  res.status(500).json({
    msg: "Terjadi kesalahan server",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// =====================
// START SERVER (DULU)
// =====================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// =====================
// CONNECT DB (BELAKANGAN)
// =====================
(async () => {
  try {
    const sequelize = require("./src/config/db");
    require("./src/api/v1/models");

    await sequelize.authenticate();
    console.log("✅ Database connected");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
})();
