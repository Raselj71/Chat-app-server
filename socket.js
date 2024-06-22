const Message = require("./message/message.model");

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("join", ({ userId }) => {
    socket.join(userId);
    console.log(`user ${userId} join the room`);
  });

  socket.on("sendMessage", async ({ sender, receiver, content }) => {
    try {
      const message = new Message({
        sender,
        receiver,
        content,
      });
      await message.save();

      console.log(message);

      io.to(receiver).emit("receiveMessage", message);
      io.to(sender).emit("receiveMessage", message);
    } catch (error) {
      console.log(error);
    }
  });
});
