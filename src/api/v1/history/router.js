const { getAllHistory } = require("./controller.js");
const route = require("express").Router();

route.get("/history", getAllHistory);

module.exports = route;
