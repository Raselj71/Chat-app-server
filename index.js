const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);
global.io = new Server(server, { cors: { origin: "*" } });
require("./socket");
const dbconnect = require("./dbconfig");
const PORT = process.env.PORT || 5000;
const route = require("./route");
app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true); // Allow all origins
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", route);
app.get("/", (req, res) => {
  res.send("rasel");
});

server.listen(PORT, async () => {
  dbconnect();
  console.log(`server running at http://localhost:${PORT}`);
});
