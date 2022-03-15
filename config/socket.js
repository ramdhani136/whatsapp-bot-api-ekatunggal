const cors = require("cors");
const express = require("express");
const socketIO = require("socket.io");
const app = express();
const http = require("http");
const server = http.createServer(app);

io = socketIO(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:5000"],
    methods: ["GET", "POST"],
    transports: ["websocket", "polling", "flashsocket"],
    allowedHeaders: ["react-client"],
    credentials: true,
  },
});

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5000"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

module.exports = io;
