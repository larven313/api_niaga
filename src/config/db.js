const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    timezone: "+07:00",
  }
);

// Test koneksi (aman)
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Koneksi database berhasil");
  } catch (error) {
    console.error("❌ Koneksi database gagal:", error.message);
  }
})();

module.exports = sequelize;
