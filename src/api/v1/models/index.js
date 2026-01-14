const Pelanggan = require("../pelanggan/model");
const Pesanan = require("../pesanan/model");
const User = require("../user/model");

User.hasOne(Pelanggan, {
  foreignKey: "user_id",
  as: "pelanggan",
});

Pelanggan.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

Pesanan.belongsTo(Pelanggan, {
  foreignKey: "pelanggan_id",
  as: "pelanggan",
});

Pelanggan.hasMany(Pesanan, {
  foreignKey: "pelanggan_id",
  as: "pesanan",
});
