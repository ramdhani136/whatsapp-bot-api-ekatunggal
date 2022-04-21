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

const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
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

const createSession = async (id) => {
  // const Session = db.sessions;
  // const dataSession = await Session.findOne({ where: { id: id } });

  // const client = new Client({
  //   puppeteer: {
  //     headless: true,
  //     args: [
  //       "--no-sandbox",
  //       "--disable-setuid-sandbox",
  //       "--disable-dev-shm-usage",
  //       "--disable-accelerated-2d-canvas",
  //       "--no-first-run",
  //       "--no-zygote",
  //       "--single-process",
  //       "--disable-gpu",
  //     ],
  //   },
  //   authStrategy: new LocalAuth({ clientId: id }),
  // });

  // const sessionSave = JSON.parse(dataSession.dataValues.session);
  const client = new Client({
    restartOnAuthFail: true,
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
    // authStrategy: new LegacySessionAuth({
    //   session: sessionSave, // saved session object
    // }),
    authStrategy: new LocalAuth({ clientId: id }),
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

  client.on("authenticated", async (session) => {
    io.emit("authenticated", { id: id });
    io.emit("message", { id: id, text: "Whatsapp is authenticated!" });
    // const data = { ready: 1, session: session };
    // const Session = db.sessions;
    // await Session.update(data, { where: { id: id } });
  });

  client.on("auth_failure", async (session) => {
    io.emit("message", { id: id, text: "Auth eror ,restarting..." });

    // const data = { ready: 0, session: null };
    // const Session = db.sessions;
    // // updateSession(false, id, null);
    // await Session.update(data, { where: { id: id } });

    client.destroy();
    client.initialize();
  });

  client.on("disconnected", async (reason) => {
    io.emit("message", { id: id, text: "Whatsapp is disconnected!" });
    // const data = { ready: 0, session: null };
    // const Session = db.sessions;
    // await Session.update(data, { where: { id: id } });

    client.destroy();
    client.initialize();
  });

  // AutoReply
  client.on("message", async (msg) => {
    const chat = await msg.getChat();
    const contact = await msg.getContact();
    const Customer = db.customers;
    const allCust = await Customer.findAll();
    const UriFile = db.urifiles;
    const Keys = db.keys;
    const Menu = db.menu;
    const newCustomer = async () => {
      return await db.customers.findAll({
        order: [["id", "DESC"]],
        include: [
          {
            model: Menu,
            as: "menuAktif",
          },
          {
            model: Menu,
            as: "prevMenu",
          },
          {
            model: Keys,
            as: "prevKey",
          },
        ],
      });
    };
    const IsKey = await db.keys.findOne({ where: { name: msg.body } });
    const IsCustomer = await Customer.findOne({
      where: { phone: chat.id.user },
    });

    const userTyping = msg.body;
    const isResult = allCust.filter((cust) => cust.phone === chat.id.user);
    const index_ = msg.body.indexOf("_");

    if (isResult.length < 1 && !chat.isGroup) {
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
      await Customer.create(data).then(async () => {
        io.emit("customers", await newCustomer());
      });
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
            const newMsg = Bots[i].dataValues.message.replace(
              "{name}",
              isResult[0].dataValues.name
            );
            if (newMsg !== "") {
              msg.reply(newMsg);
            }
            if (Bots[i].dataValues.forward) {
              const forwardBot = await db.bots.findAll({
                where: {
                  id_prevMenu: Bots[i].dataValues.id_prevMenu,
                  id_prevKey: Bots[i].dataValues.id_prevKey,
                },
              });
              console.log(forwardBot);
            }

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
            }).then(async () => {
              io.emit("customers", await newCustomer());
            });
          }
        }
      }

      // Ganti nama dan kota
      if (userTyping.substring(0, 1) == "#") {
        updateValue = {
          name: userTyping.substring(1, index_),
          kota: userTyping.substring(index_ + 1, 255),
        };
        await Customer.update(updateValue, {
          where: { phone: chat.id.user },
        }).then(async () => {
          io.emit("customers", await newCustomer());
        });

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
        ).then(async () => {
          io.emit("customers", await newCustomer());
        });
        // .then(() => {
        //   io.emit("customers", newCustomer);
        // });
        msg.reply("Kamu memilih item  : " + userTyping.substring(1, 255));
      }
      // End

      //Kirim kontak
      if ((msg.body = "$kontak" && !chat.isGroup)) {
        var isContact = [...contact];
        // isContact.number = "085700000000";
        // isContact.verifiedName = "cobain doang";
        // isContact.isBusiness = false;
        // isContact.id.user = "085700000000";
        // isContact.id._serialized = "085700000000@c.us";
        console.log(isContact);
        console.log(contact);
        msg.reply(contact);
        // msg.reply(isContact);
      }
      // End kirim kontak
    }
    // End AutoReply
  });

  app.use("/logout", (req, res) => {
    client.logout();
    res.send("sukses");
  });
};

const init = async (socket) => {
  const Keys = db.keys;
  const Menu = db.menu;
  const UriFiles = db.urifiles;
  const Customer = await db.customers.findAll({
    order: [["id", "DESC"]],
    include: [
      {
        model: Menu,
        as: "menuAktif",
      },
      {
        model: Menu,
        as: "prevMenu",
      },
      {
        model: Keys,
        as: "prevKey",
      },
    ],
  });
  const bots = await db.bots.findAll({
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
        model: UriFiles,
        as: "urifiles",
      },
    ],
    order: [["id_menuAktif", "ASC"]],
  });
  const session = await db.sessions.findAll();

  if (session.length > 0) {
    if (socket) {
      socket.emit("init", session);
      socket.emit("bots", bots);
      socket.emit("customers", Customer);
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
  const data = await Session.findAll({});
  io.emit("init", data);
  createSession(session.id, session.name, session.description);
  res.send("sukses");
});
// End tambah akun

// Hapus Akun
app.delete("/session/:id", async (req, res) => {
  const Session = db.sessions;
  await Session.destroy({ where: { id: req.params.id } });
  const data = await Session.findAll({});
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
const { bots } = require("./models");

app.use(function (req, res, next) {
  req.socket = io;
  next();
});

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
