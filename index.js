const express = require("express");
const fileUpload = require("express-fileupload");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const sequelize = require("./src/config/db");
require("./src/api/v1/models");

const app = express();
const PORT = process.env.PORT; // WAJIB dari Railway

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// Root — WAJIB cepat
app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    service: "API Toko",
  });
});

// Routes
app.use("/api/v1", require("./src/api/v1/jenis_produk/router"));
app.use("/api/v1", require("./src/api/v1/produk/router"));
app.use("/api/v1", require("./src/api/v1/pelanggan/router"));
app.use("/api/v1", require("./src/api/v1/pesanan/router"));
app.use("/api/v1", require("./src/api/v1/pesanan_items/router"));
app.use("/api/v1", require("./src/api/v1/kartu/router"));
app.use("/api/v1", require("./src/api/v1/history/router"));
app.use("/api/v1", require("./src/api/v1/user/router"));

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

// 🚀 START SETELAH DB OK
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server listening on ${PORT}`);
    });
  } catch (err) {
    console.error("❌ DB FAILED:", err);
    process.exit(1); // BIAR Railway tau gagal
  }
})();
