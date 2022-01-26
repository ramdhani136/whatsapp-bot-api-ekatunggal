const { Client, MessageMedia } = require("whatsapp-web.js");
const express = require("express");
const socketIO = require("socket.io");
const qrcode = require("qrcode");
const fs = require("fs");
const http = require("http");
const { phoneNumberFormatter } = require("./utils/formatter");
const axios = require("axios");
const {
  readSession,
  updateSession,
  findSession,
  saveSession,
  readLimit,
} = require("./helper/db");
const console = require("console");

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

const createSession = async (id, name, description) => {
  const dataSession = await findSession(id);
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
    session: dataSession.session,
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
  });

  client.on("authenticated", (session) => {
    io.emit("authenticated", { name: name });
    io.emit("message", { name: name, text: "Whatsapp is authenticated!" });
    updateSession(true, id, session);
  });

  client.on("auth_failure", (session) => {
    io.emit("message", { name: name, text: "Auth eror ,restarting..." });
  });

  client.on("disconnected", async (reason) => {
    io.emit("message", { name: name, text: "Whatsapp is disconnected!" });
    // fs.unlinkSync(SESSION_FILE_PATH, function (err) {
    //   if (err) return console.error(err);
    //   console.log("Session file deleted");
    // });
    updateSession(false, id, null);

    client.destroy();
    client.initialize();
  });

  // Tambahkan client ke session
  session.push({
    id: id,
    name: name,
    deksripsi: description,
    client: client,
  });
};

const init = async (socket) => {
  const savedSession = await readSession();
  if (savedSession.length > 0) {
    if (socket) {
      socket.emit("init", savedSession);
    } else {
      // Menambahkan data akun
      savedSession.forEach((sess) => {
        createSession(sess.id, sess.name, sess.deskripsi);
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

app.post("/akun/create", async (req, res) => {
  saveSession(req.body.name, req.body.deskripsi);
  const data = await readLimit();
  io.emit("init", data);
  createSession(data.id, data.name, data.description);
  // createSession(res.id, data.name, data.description);
  res.send("sukses");
});

// Menambah akun

// End tambah akun

// Mengirim pesan
app.post("/sendMessage", async (req, res) => {
  const dataSessions = await readSession();
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
