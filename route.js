const express = require("express");
const router = express.Router();

//user route
const UserRoute = require("./user/user.route");
router.use("/user", UserRoute);

module.exports = router;
