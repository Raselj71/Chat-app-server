const jwt = require("jsonwebtoken");

exports.verification = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(200).json({ status: false, message: "no token" });
    }

    const decode = jwt.verify(token, "rasel");
    console.log(decode);
    next();
  } catch (error) {
    console.log(error);
  }
};
