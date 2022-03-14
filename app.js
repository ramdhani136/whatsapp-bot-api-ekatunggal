const { Client, MessageMedia } = require("whatsapp-web.js");
const express = require("express");
const socketIO = require("socket.io");
const qrcode = require("qrcode");
const fs = require("fs");
const http = require("http");
const { phoneNumberFormatter } = require("./utils/formatter");
const axios = require("axios");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const {
  readSession,
  updateSession,
  findSession,
  saveSession,
  readLimit,
  removeSession,
} = require("./helper/db");
const { reset } = require("nodemon");

const app = express();
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

const port = process.env.PORT || 5000;

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
      io.emit("qr", { id: id, src: url });
      io.emit("message", {
        id: id,
        text: "QR Code received,scan please ..",
      });
    });
  });

  client.on("ready", () => {
    io.emit("ready", { id: id });
    io.emit("message", { id: id, text: "Whatsapp is ready!" });
  });

  client.on("authenticated", (session) => {
    io.emit("authenticated", { id: id });
    io.emit("message", { id: id, text: "Whatsapp is authenticated!" });
    updateSession(true, id, session);
  });

  client.on("auth_failure", (session) => {
    io.emit("message", { id: id, text: "Auth eror ,restarting..." });
  });

  client.on("disconnected", async (reason) => {
    io.emit("message", { id: id, text: "Whatsapp is disconnected!" });
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

  client.on("message", async (msg) => {
    // console.log(msg);
    const chat = await msg.getChat();
    const contact = await msg.getContact();
    if (msg.body == "!ping") {
      await msg.reply(`${contact.pushname} Selamat pagi!`);
      const media = await MessageMedia.fromUrl(
        "https://juser.fz-juelich.de/record/891478/files/python-2021.pdf"
      );
      // await chat.sendMessage(media);
      await msg.reply(media);
    } else if (msg.body.toLowerCase() == "tes") {
      await msg.reply(contact.pushname);
      // console.log(contact);
    }
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

// Menambah akun
app.post("/akun/create", async (req, res) => {
  saveSession(req.body.name, req.body.deskripsi, req.body.username);
  const data = await readSession();
  io.emit("init", data);
  createSession(data.id, data.name, data.description);

  res.send("sukses");
});
// End tambah akun

// Hapus Akun
app.delete("/akun/:id", async (req, res) => {
  removeSession(req.params.id);
  const data = await readSession();
  io.emit("init", data);
  res.send("delete");
});
// End

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

// files
app.post("/files", (req, res) => {
  if (!req.files) return res.status(404).send("Bad Request");
  for (let i = 0; i < req.files.file.length; i++) {
    fs.writeFile(
      `./assets/files/${req.files.file[i].name}`,
      req.files.file[i].data,
      () => {
        console.log("File written successfully");
      }
    );
  }
  res.send("done");
});

// coba mvc
const sessionRouter = require("./routes/session");
app.use("/coba", sessionRouter);

server.listen(port, () => {
  console.log(`Listening port : ${port}`);
});
