const { Client, MessageMedia } = require("whatsapp-web.js");
const express = require("express");
const { body, validationResult } = require("express-validator");
const socketIO = require("socket.io");
const qrcode = require("qrcode");
const fs = require("fs");
const http = require("http");
const { phoneNumberFormatter } = require("./utils/formatter");
const fileUpload = require("express-fileupload");
const axios = require("axios");

const app = express();
const server = http.createServer(app);

io = socketIO(server);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ debug: true }));
const port = process.env.PORT || 8000;

const SESSION_FILE_PATH = "./waSession.json";
let sessionCfg;
if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionCfg = require(SESSION_FILE_PATH);
}

app.get("/", (req, res) => {
  res.sendFile("./view/index.html", { root: __dirname });
  //   res.status(200).json({ status: true, message: "Hello World" });
});

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

client.on("message", (msg) => {
  if (msg.body == "!ping") {
    msg.reply("pong");
  } else if (msg.body.toLowerCase() == "good morning") {
    msg.reply("Selamat Pagi");
  }
});

client.initialize();

io.on("connection", (socket) => {
  socket.emit("message", "Connection ...");

  client.on("qr", (qr) => {
    console.log(`QR RECEIVED ${qr}`);
    qrcode.toDataURL(qr, (err, url) => {
      socket.emit("qr", url);
      socket.emit("message", "QR Code received,scan please ..");
    });
  });

  client.on("qr", (qr) => {
    // Generate and scan this code with your phone
    console.log("QR RECEIVED", qr);
    socket.emit("qr", qr);
    socket.emit("message", "QR Code received,scan please ..");
    //   qrcode.generate(qr);
  });

  client.on("ready", () => {
    socket.emit("ready", "Whatsapp is authenticated!");
    socket.emit("message", "Whatsapp is authenticated!");
  });

  client.on("authenticated", (session) => {
    socket.emit("authenticated", "Whatsapp is authenticated!");
    socket.emit("message", "Whatsapp is authenticated!");
    console.log("AUTHENTICATED", session);
    sessionCfg = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
      if (err) {
        console.error(err);
      }
    });
  });
});

// Cek nomor sudah terdaftar wa
const checkRegisteredNumber = async (number) => {
  const isRegistered = await client.isRegisteredUser(number);
  return isRegistered;
};

// Mengirim pesan
app.post(
  "/sendMessage",
  [body("number").notEmpty(), body("message").notEmpty()],
  async (req, res) => {
    const errors = validationResult(req).formatWith(({ msg }) => {
      return msg;
    });
    if (!errors.isEmpty()) {
      return res.status(422).json({ status: false, message: errors.mapped() });
    }
    const number = phoneNumberFormatter(req.body.number);
    const message = req.body.message;

    isRegisteredNumber = await checkRegisteredNumber(number);

    if (!isRegisteredNumber) {
      return res
        .status(402)
        .json({ status: false, message: "The number is not registered" });
    }
    client
      .sendMessage(number, message)
      .then((response) => {
        res.status(200).json({ status: true, response: response });
      })
      .catch((err) => {
        res.status(500).json({ status: false, response: err });
      });
  }
);
// end message

// Send media

// with link
app.post("/sendMediaLink", async (req, res) => {
  const number = phoneNumberFormatter(req.body.number);
  const caption = req.body.caption;
  const fileUrl = req.body.file;

  // menggunakan form link
  let mimetype;
  const attachment = await axios
    .get(fileUrl, { responseType: "arraybuffer" })
    .then((response) => {
      mimetype = response.headers["content-type"];
      return response.data.toString("base64");
    });
  const media = new MessageMedia(mimetype, attachment, "Media");

  client
    .sendMessage(number, media, { caption: caption })
    .then((response) => {
      res.status(200).json({ status: true, response: response });
    })
    .catch((err) => {
      res.status(500).json({ status: false, response: err });
    });
});

// with lokal file
app.post("/sendMediaLokal", async (req, res) => {
  const number = phoneNumberFormatter(req.body.number);
  const caption = req.body.caption;
  const fileUrl = req.body.file;
  // mengambil dari img lokal
  const media = MessageMedia.fromFilePath("./assets/img/etm.png");

  client
    .sendMessage(number, media, { caption: caption })
    .then((response) => {
      res.status(200).json({ status: true, response: response });
    })
    .catch((err) => {
      res.status(500).json({ status: false, response: err });
    });
});

// with attach file form data
app.post("/sendMediaAttach", async (req, res) => {
  const number = phoneNumberFormatter(req.body.number);
  const caption = req.body.caption;

  // mengambil file dri form
  const file = req.files.file;
  const media = new MessageMedia(
    file.mimetype,
    file.data.toString("base64"),
    file.name
  );

  client
    .sendMessage(number, media, { caption: caption })
    .then((response) => {
      res.status(200).json({ status: true, response: response });
    })
    .catch((err) => {
      res.status(500).json({ status: false, response: err });
    });
});

// end send media

server.listen(port, () => {
  console.log(`Listening port : ${port}`);
});
