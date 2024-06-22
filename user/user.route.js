const express = require("express");
const {
  signup,
  login,
  alluser,
  singleuser,
  allmessages,
} = require("./user.controller");
const { verification } = require("../verify/verify.controller");
const route = express.Router();

route.post("/signup", signup);
route.post("/login", login);
route.get("/alluser", verification, alluser);
route.get("/singleuser/:id", singleuser);
route.get("/messages/:user1/:user2", allmessages);

module.exports = route;
