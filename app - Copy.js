const {
  Client,
  MessageMedia,
  LocalAuth,
  LegacySessionAuth,
} = require("whatsapp-web.js");
const express = require("express");
const socketIO = require("socket.io");
const qrcode = require("qrcode");
const fs = require("fs");
const http = require("http");
const { phoneNumberFormatter } = require("./utils/formatter");
const axios = require("axios");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const db = require("./models");
const {
  readSession,
  updateSession,
  findSession,
  saveSession,
  removeSession,
} = require("./helper/db");
const app = express();
const server = http.createServer(app);
// const io = require("./config/socket");

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
// const SESSION_FILE = "./whatsapp-sessions.json";

// const setSessionFile = (session) => {
//   fs.writeFile(SESSION_FILE, JSON.stringify(session), (err) => {
//     if (err) {
//       console.error(err);
//     }
//   });
// };

// const getSessionfile = () => {
//   return JSON.parse(fs.readFileSync(SESSION_FILE));
// };

const createSession = async (id) => {
  const Session = db.sessions;
  const dataSession = await Session.findOne({ where: { id: id } });

  const authStrategy = await new LegacySessionAuth({
    session: dataSession.dataValues.session,
    restartOnAuthFail: false,
  });

  const client = await new Client({
    authStrategy,
  });
  client.initialize();

  console.log("HHHHHH");
  console.log(id);
  console.log(dataSession.dataValues.session);

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

  client.on("authenticated", async (session) => {
    io.emit("authenticated", { id: id });
    io.emit("message", { id: id, text: "Whatsapp is authenticated!" });
    const data = { ready: 1, session: session };
    // updateSession(true, id, session);

    const Session = db.sessions;
    await Session.update(data, { where: { id: id } });
  });

  client.on("auth_failure", (session) => {
    io.emit("message", { id: id, text: "Auth eror ,restarting..." });

    const data = { ready: 0, session: null };
    const Session = db.sessions;
    // updateSession(false, id, null);
    // await Session.update(data, { where: { id: id } });

    // client.destroy();
    // client.initialize();
  });

  client.on("disconnected", async (reason) => {
    io.emit("message", { id: id, text: "Whatsapp is disconnected!" });
    // fs.unlinkSync(SESSION_FILE_PATH, function (err) {
    //   if (err) return console.error(err);
    //   console.log("Session file deleted");
    // });
    const data = { ready: 0, session: null };
    const Session = db.sessions;
    // updateSession(false, id, null);
    await Session.update(data, { where: { id: id } });

    client.destroy();
    client.initialize();
  });

  // Tambahkan client ke session
  // session.push({
  //   id: id,
  //   name: name,
  //   deksripsi: description,
  //   client: client,
  // });

  // Auto Reply
  client.on("message", async (msg) => {
    const chat = await msg.getChat();
    const contact = await msg.getContact();
    const Customer = db.customers;
    const allCust = await Customer.findAll();
    const UriFile = db.urifiles;
    const Keys = db.keys;
    const Menu = db.menu;
    const IsKey = await db.keys.findOne({ where: { name: msg.body } });
    const IsCustomer = await Customer.findOne({
      where: { phone: chat.id.user },
    });

    const userTyping = msg.body;
    const isResult = allCust.filter((cust) => cust.phone === chat.id.user);
    const index_ = msg.body.indexOf("_");

    if (isResult.length < 1) {
      const nama =
        contact.verifiedName !== undefined
          ? contact.verifiedName
          : contact.pushname;
      const data = {
        name: nama,
        phone: chat.id.user,
        id_menuAktif: 1,
        id_prevMenu: 1,
        id_prevKey: 14,
      };
      await Customer.create(data);
      // msg.reply("anda user baru");
    } else {
      // //Data Dinamis
      if (IsKey !== null) {
        const menuAktif = IsCustomer.dataValues.id_menuAktif;
        const Bots = await db.bots.findAll({
          include: [
            {
              model: Keys,
              as: "key",
            },
            {
              model: Keys,
              as: "prevKey",
            },
            {
              model: Menu,
              as: "menuAktif",
            },
            {
              model: Menu,
              as: "prevMenu",
            },
            {
              model: Menu,
              as: "afterMenu",
            },
            {
              model: UriFile,
              as: "urifiles",
            },
          ],
          where: { id_key: IsKey.dataValues.id, id_menuAktif: menuAktif },
          order: [["id", "ASC"]],
        });
        if (Bots.length > 0) {
          for (var i = 0; i < Bots.length; i++) {
            msg.reply(Bots[i].dataValues.message);
            if (Bots[i].dataValues.urifiles.length > 0) {
              for (let j = 0; j < Bots[i].dataValues.urifiles.length; j++) {
                const media = await MessageMedia.fromUrl(
                  Bots[i].dataValues.urifiles[j].name
                );
                chat.sendMessage(media);
              }
            }
            const updateCustomer = {
              id_menuAktif: Bots[i].id_afterMenu,
              id_prevMenu: Bots[i].id_prevMenu,
              id_prevKey: Bots[i].id_prevKey,
            };
            await Customer.update(updateCustomer, {
              where: { phone: chat.id.user },
            });
          }
        }
      }
      // if (KeyReply !== null) {
      //   // message
      //   if (KeyReply.dataValues.bots.length > 0) {
      //     for (let i = 0; i < KeyReply.dataValues.bots.length; i++) {
      //       if (KeyReply.dataValues.bots[i].message !== "") {
      //         msg.reply(KeyReply.dataValues.bots[i].message);
      //       }
      //     }
      //   }
      //   // End Message

      //   // Urlfile
      //   if (KeyReply.dataValues.urifiles.length > 0) {
      //     for (let i = 0; i < KeyReply.dataValues.urifiles.length; i++) {
      // const media = await MessageMedia.fromUrl(
      //   KeyReply.dataValues.urifiles[i].name
      // );
      // chat.sendMessage(media);
      //     }
      //   }
      //   // End Urlfiles
      // } else {
      //   console.log("no data");
      // }
      // // End Data Dinamis

      // Ganti nama dan kota
      if (userTyping.substring(0, 1) == "#") {
        updateValue = {
          name: userTyping.substring(1, index_),
          kota: userTyping.substring(index_ + 1, 255),
        };
        await Customer.update(updateValue, { where: { phone: chat.id.user } });
        msg.reply(
          "Sekarang kami akan memanggil kamu : " +
            userTyping.substring(1, index_)
        );
        msg.reply("Kota  : " + userTyping.substring(index_ + 1, 255));
      }
      // End Ganti Nama kota

      // Input item dipilih
      if (userTyping.substring(0, 1) == "*") {
        await Customer.update(
          { item: userTyping.substring(1, 255) },
          { where: { phone: chat.id.user } }
        );
        msg.reply("Kamu memilih item  : " + userTyping.substring(1, 255));
      }
      // End

      // update key aktif
      // if (userTyping.substring(0, 1) == "/") {
      //   await Customer.update(
      //     { key: userTyping.substring(1, 255) },
      //     { where: { phone: chat.id.user } }
      //   );
      //   msg.reply(
      //     "Kamu sedang berada di menu : " + userTyping.substring(1, 255)
      //   );
      // }
      // End
    }
    // End AutoReply

    // if (msg.body == "!ping") {
    //   await msg.reply(`${contact.pushname} Selamat pagi!`);
    //   const media = await MessageMedia.fromUrl(
    //     "https://juser.fz-juelich.de/record/891478/files/python-2021.pdf"
    //   );
    //   // await chat.sendMessage(media);
    //   await msg.reply(media);
    // } else if (msg.body.toLowerCase() == "tes") {
    //   await msg.reply(contact.pushname);
    //   // console.log(contact);
    // }
  });

  app.use("/logout", (req, res) => {
    client.destroy();
    client.initialize();
    res.send("sukses");
  });
};

const init = async (socket) => {
  // const savedSession = await readSession();

  const session = await db.sessions.findAll();

  if (session.length > 0) {
    if (socket) {
      socket.emit("init", session);
    } else {
      // Menambahkan data akun
      session.forEach((sess) => {
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
app.post("/session/create", async (req, res) => {
  let upl = {
    name: req.body.name,
    deskripsi: req.body.deskripsi,
    username: req.body.username,
    password: req.body.password,
  };
  const Session = db.sessions;
  const session = await Session.create(upl);
  // saveSession(req.body.name, req.body.deskripsi, req.body.username);
  // const data = await readSession();
  const data = await Session.findAll({});
  io.emit("init", data);
  createSession(session.id, session.name, session.description);
  res.send("sukses");
});
// End tambah akun

// Hapus Akun
app.delete("/session/:id", async (req, res) => {
  // removeSession(req.params.id);
  const Session = db.sessions;
  await Session.destroy({ where: { id: req.params.id } });
  const data = await Session.findAll({});
  // const data = await readSession();
  io.emit("init", data);
  res.send("delete");
});
// End

// Mengirim pesan
app.post("/sendMessage", async (req, res) => {
  // const dataSessions = await readSession();
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

// Routes
const sessionRouter = require("./routes/session");
const keyRouter = require("./routes/key");
const uriFileRouter = require("./routes/uriFile");
const botRouter = require("./routes/bot");
const customerRouter = require("./routes/customer");
const menuRouter = require("./routes/menu");

app.use("/session", sessionRouter);
app.use("/key", keyRouter);
app.use("/urifiles", uriFileRouter);
app.use("/bots", botRouter);
app.use("/customer", customerRouter);
app.use("/menu", menuRouter);
// End

server.listen(port, () => {
  console.log(`Listening port : ${port}`);
});
