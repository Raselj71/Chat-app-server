const mongoose = require("mongoose");

const dbconnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://alexkrein9:RAIHANj10205060@chattingdb.ap9ocvo.mongodb.net/ChattingDB"
    );
    console.log("database Connected Successfully");
  } catch (error) {
    console.log(error);
    console.log("database not connected");
  }
};

module.exports = dbconnect;
