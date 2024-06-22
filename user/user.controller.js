const User = require("./user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Message = require("../message/message.model");

exports.signup = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(200)
        .json({ status: false, message: "user already exist" });
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const newuser = new User({
      name,
      email,
      phone,
      password: hashpassword,
    });

    await newuser.save();
    return res
      .status(200)
      .json({ status: true, message: "signup successfully", newuser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: "internal error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(200)
        .json({ status: false, message: "Incorrect email" });
    }

    const compare = await bcrypt.compare(password, user.password);

    if (!compare) {
      return res
        .status(200)
        .json({ status: false, message: "Incorrect password" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, "rasel");

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 18000000,
      secure: true,
    });

    return res
      .status(200)
      .json({ status: true, message: "successfull login", token: token });
  } catch (error) {
    console.log(error);
    console.log(error);
    return res.status(500).json({ status: false, message: "internal error" });
  }
};

exports.alluser = async (req, res) => {
  try {
    const user = await User.find({}, { password: 0 });
    res.send(user);
  } catch (error) {
    console.log(error)
     return res.status(500).json({ status: false, message: "internal error" });
  }
};

exports.singleuser = async (req, res) => {
  try {
    const userid = req.params.id;

    const user = await User.findOne({ _id: userid }, { password: 0 });
    res.send(user);
  } catch (error) {
    console.log(error);
  }
};

exports.allmessages = async (req, res) => {
  try {
    const { user1, user2 } = req.params;
    const messages = await Message.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 },
      ],
    }).sort("timestamp");
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
