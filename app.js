const { Client, MessageMedia } = require("whatsapp-web.js");
const express = require("express");
const socketIO = require("socket.io");
const qrcode = require("qrcode");
const fs = require("fs");
const http = require("http");
const { phoneNumberFormatter } = require("./utils/formatter");
const axios = require("axios");
const { readSession, updateSession } = require("./helper/db");

const app = express();
const server = http.createServer(app);

io = socketIO(server);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile("./view/indexmulti.html", { root: __dirname });
});

const session = [];
const SESSION_FILE = "./whatsapp-sessions.json";

const setSessionFile = (session) => {
  fs.writeFile(SESSION_FILE, JSON.stringify(session), (err) => {
    if (err) {
      console.error(err);
    }
  });
};

const getSessionfile = () => {
  return JSON.parse(fs.readFileSync(SESSION_FILE));
};

const createSession = (id, name, description) => {
  console.log("create session" + name);
  const SESSION_FILE_PATH = `./waSession-${id}.json`;
  let sessionCfg;
  if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionCfg = require(SESSION_FILE_PATH);
  }

  const client = new Client({
    puppeteer: {
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--single-process",
        "--disable-gpu",
      ],
    },
    session: sessionCfg,
  });

  client.initialize();

  client.on("qr", (qr) => {
    console.log(`QR RECEIVED ${qr}`);
    qrcode.toDataURL(qr, (err, url) => {
      io.emit("qr", { name: name, src: url });
      io.emit("message", {
        name: name,
        text: "QR Code received,scan please ..",
      });
    });
  });

  client.on("ready", () => {
    io.emit("ready", { name: name });
    io.emit("message", { name: name, text: "Whatsapp is ready!" });
    updateSession(true, id);
  });

  client.on("authenticated", (session) => {
    console.log(session);
    io.emit("authenticated", { name: name });
    io.emit("message", { name: name, text: "Whatsapp is authenticated!" });
    sessionCfg = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
      if (err) {
        console.error(err);
      }
    });
  });

  client.on("auth_failure", (session) => {
    io.emit("message", { name: name, text: "Auth eror ,restarting..." });
  });

  client.on("disconnected", async (reason) => {
    io.emit("message", { name: name, text: "Whatsapp is disconnected!" });
    fs.unlinkSync(SESSION_FILE_PATH, function (err) {
      if (err) return console.error(err);
      console.log("Session file deleted");
    });
    updateSession(false, id);
    client.destroy();
    client.initialize();
  });

  // Tambahkan client ke session
  session.push({
    id: id,
    description: description,
    client: client,
  });
  // Menambahkan session ke file
  const savedSession = getSessionfile();
  const sessionIndex = savedSession.findIndex((sess) => sess.id == id);

  if (sessionIndex == -1) {
    savedSession.push({ id: id, description: description, ready: false });
    setSessionFile(savedSession);
  }
};

const init = async (socket) => {
  // const savedSession = getSessionfile();
  const savedSession = await readSession();
  if (savedSession.length > 0) {
    if (socket) {
      socket.emit("init", savedSession);
    } else {
      // Menambahkan data akun
      savedSession.forEach((sess) => {
        createSession(sess.id, sess.name, sess.description);
      });
    }
  }
};

init();

io.on("connection", (socket) => {
  init(socket);
  socket.on("create-session", (data) => {
    createSession(data.id, data.name, data.description);
  });
});

// Mengirim pesan
app.post("/sendMessage", (req, res) => {
  const sender = req.body.sender;
  const number = phoneNumberFormatter(req.body.number);
  const message = req.body.message;

  const client = session.find((sess) => sess.id == sender).client;

  console.log(client);
  client
    .sendMessage(number, message)
    .then((response) => {
      res.status(200).json({ status: true, response: response });
    })
    .catch((err) => {
      res.status(500).json({ status: false, response: err });
    });
});
// end message

server.listen(port, () => {
  console.log(`Listening port : ${port}`);
});
