const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./model");
const { StatusCodes } = require("http-status-codes");

// REGISTER
const register = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // default gambar
    let fileName = "default.png";
    let url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    // jika ada upload gambar
    const file = req?.files?.gambar;
    if (file) {
      const ext = path.extname(file.name).toLowerCase();
      const allowedExt = [".png", ".jpg", ".jpeg"];
      if (!allowedExt.includes(ext)) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "Format gambar tidak valid" });
      }
      if (file.size > 5_000_000) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "Ukuran gambar maksimal 5MB" });
      }

      fileName = `${file.md5}${ext}`;
      const compressedPath = path.join("public/images", fileName);
      const sharpInstance = sharp(file.data).resize(800);

      if (ext === ".png") {
        await sharpInstance.png({ quality: 80 }).toFile(compressedPath);
      } else {
        await sharpInstance.jpeg({ quality: 70 }).toFile(compressedPath);
      }

      url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    }

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || "pelanggan",
      status: "aktif",
      gambar: fileName,
      url,
    });

    res.status(StatusCodes.CREATED).json({
      msg: "User berhasil didaftarkan",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * CREATE USER BY ADMIN
 * (khusus admin / superadmin)
 */
const createUserByAdmin = async (req, res, next) => {
  try {
    const { username, email, password, role, status } = req.body;

    // cek username unik
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "Username sudah digunakan",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // default gambar
    let fileName = "default.png";
    let url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    const file = req?.files?.gambar;
    if (file) {
      const ext = path.extname(file.name).toLowerCase();
      const allowedExt = [".png", ".jpg", ".jpeg"];

      if (!allowedExt.includes(ext)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          msg: "Format gambar tidak valid",
        });
      }

      if (file.size > 5_000_000) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          msg: "Ukuran gambar maksimal 5MB",
        });
      }

      fileName = `${file.md5}${ext}`;
      const compressedPath = path.join("public/images", fileName);
      const sharpInstance = sharp(file.data).resize(800);

      if (ext === ".png") {
        await sharpInstance.png({ quality: 80 }).toFile(compressedPath);
      } else {
        await sharpInstance.jpeg({ quality: 70 }).toFile(compressedPath);
      }

      url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    }

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || "pelanggan",
      status: status || "aktif",
      gambar: fileName,
      url,
    });

    return res.status(StatusCodes.CREATED).json({
      msg: "User berhasil dibuat oleh admin",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// LOGIN
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "User tidak ditemukan" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Password salah" });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || "1d" }
    );

    res.status(StatusCodes.OK).json({
      msg: "Login berhasil",
      token,
    });
  } catch (error) {
    next(error);
  }
};

// GET ALL USER
const getAllUser = async (req, res, next) => {
  try {
    const result = await User.findAll();
    return res.status(StatusCodes.OK).json({
      msg: "Data berhasil didapatkan",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE USER PROFILE (termasuk gambar)
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, email, role, status } = req.body;

    const user = await User.findOne({ where: { uuid: id } });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "User tidak ditemukan" });
    }

    let fileName = user.gambar;
    let url = user.url;

    const file = req?.files?.gambar;
    if (file) {
      const ext = path.extname(file.name).toLowerCase();
      const allowedExt = [".png", ".jpg", ".jpeg"];
      if (!allowedExt.includes(ext)) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "Format gambar tidak valid" });
      }
      if (file.size > 5_000_000) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "Ukuran gambar maksimal 5MB" });
      }

      // hapus gambar lama jika bukan default
      if (user.gambar && user.gambar !== "default.png") {
        const oldImagePath = path.join("public/images", user.gambar);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }

      fileName = `${file.md5}${ext}`;
      const compressedPath = path.join("public/images", fileName);
      const sharpInstance = sharp(file.data).resize(800);

      if (ext === ".png") {
        await sharpInstance.png({ quality: 80 }).toFile(compressedPath);
      } else {
        await sharpInstance.jpeg({ quality: 70 }).toFile(compressedPath);
      }

      url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    }

    await User.update(
      { username, email, role, status, gambar: fileName, url },
      { where: { uuid: id } }
    );

    const updatedUser = await User.findOne({ where: { uuid: id } });

    res.status(StatusCodes.OK).json({
      msg: "User berhasil diupdate",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await User.findOne({ where: { uuid: id } });
    if (!data) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "Data user tidak ditemukan",
      });
    }

    await User.destroy({ where: { uuid: id } });

    return res.status(StatusCodes.OK).json({
      msg: "User berhasil dihapus",
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getAllUser,
  updateUser,
  deleteUser,
  createUserByAdmin,
};
