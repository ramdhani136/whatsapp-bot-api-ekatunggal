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

    if (
      isResult.length < 1 &&
      !chat.isGroup &&
      chat.id.server !== "broadcast"
    ) {
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
      const kata =
        "Halo saya Vika,\r\nVirtual Assistant Ekatunggal 💁🏻\r\n\r\nKami menyediakan berbagai macam kebutuhan material untuk :\r\n✅Springbed\r\n✅Sofa\r\n✅Furniture\r\n\r\nsilahkan pilih salah satu topik dibawah ini :\r\n\r\n1  Info Produk\r\n2  Info Alamat Kantor\r\n3  Berbicara dengan Customer Service\r\n99 Daftar Menu\r\n\r\npilih salah satu, contoh : *2* (untuk kaka yang ingin mengetahui alamat kantor Vika)\r\n";
      msg.reply(kata);
    } else {
      // //Data Dinamis
      if (chat.isGroup !== true) {
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
              {
                model: db.botContact,
                as: "botcontact",
                include: [
                  {
                    model: db.sales,
                    as: "sales",
                  },
                ],
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
                    {
                      model: db.botContact,
                      as: "botcontact",
                      include: [
                        {
                          model: db.sales,
                          as: "sales",
                        },
                      ],
                    },
                  ],
                  where: {
                    id_menuAktif: Bots[i].dataValues.id_prevMenu,
                    id_key: Bots[i].dataValues.id_prevKey,
                  },
                });
                const newMsgForward = forwardBot[0].dataValues.message.replace(
                  "{name}",
                  isResult[0].dataValues.name
                );
                if (newMsgForward !== "") {
                  msg.reply(newMsgForward);
                }
                if (forwardBot[0].dataValues.urifiles.length > 0) {
                  for (
                    let h = 0;
                    h < forwardBot[0].dataValues.urifiles.length;
                    h++
                  ) {
                    const media = await MessageMedia.fromUrl(
                      forwardBot[0].dataValues.urifiles[h].name
                    );
                    chat.sendMessage(media);
                  }
                }
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
              // FORWARD CONTACT
              if (Bots[i].dataValues.botcontact.length > 0) {
                for (let b = 0; b < Bots[i].dataValues.botcontact.length; b++) {
                  // Kirim pesan & kontak sales ke customer
                  const number =
                    Bots[i].dataValues.botcontact[b].sales.dataValues.phone;
                  const chatId = "62" + number.substring(1) + "@c.us";
                  let contactin = await client.getContactById(chatId);
                  contactin.pushname =
                    Bots[i].dataValues.botcontact[b].sales.dataValues.name;
                  contactin.name =
                    Bots[i].dataValues.botcontact[b].sales.dataValues.name;
                  contactin.shortName =
                    Bots[i].dataValues.botcontact[b].sales.dataValues.name;
                  contactin.verifiedName =
                    Bots[i].dataValues.botcontact[b].sales.dataValues.name;
                  let statusContact = await client.isRegisteredUser(chatId);
                  if (statusContact) {
                    msg.reply(contactin);
                  }
                  // End Kirim pesan & kontak sales ke customer

                  client.sendMessage(
                    phoneNumberFormatter(number),
                    await msg.getContact()
                  );
                  //End Kirim kontak customer ke sales
                }
              }

              if (Bots[i].dataValues.interest !== "") {
                await Customer.update(
                  { item: Bots[i].dataValues.interest },
                  {
                    where: { phone: chat.id.user },
                  }
                ).then(async () => {
                  io.emit("customers", await newCustomer());
                });
              }
            }
          } else {
            const allMenuBots = await db.bots.findAll({
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
                {
                  model: db.botContact,
                  as: "botcontact",
                  include: [
                    {
                      model: db.sales,
                      as: "sales",
                    },
                  ],
                },
              ],
              where: { id_key: IsKey.dataValues.id, id_menuAktif: 33 },
              order: [["id", "ASC"]],
            });

            if (allMenuBots.length < 1) {
              const kata =
                "Maaf vika tidak menemukan kata kunci yang kamu masukan. \r\nSilahkan pilih menu diatas atau ketik *.home* untuk kembali ke halaman utama 🙏🏻";
              msg.reply(kata);
            }
          }

          // All Menu
          const allMenuBots = await db.bots.findAll({
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
              {
                model: db.botContact,
                as: "botcontact",
                include: [
                  {
                    model: db.sales,
                    as: "sales",
                  },
                ],
              },
            ],
            where: { id_key: IsKey.dataValues.id, id_menuAktif: 33 },
            order: [["id", "ASC"]],
          });

          if (allMenuBots.length > 0) {
            for (var i = 0; i < allMenuBots.length; i++) {
              const newAllMsg = allMenuBots[i].dataValues.message.replace(
                "{name}",
                isResult[0].dataValues.name
              );
              if (newAllMsg !== "") {
                msg.reply(newAllMsg);
              }
              if (allMenuBots[i].dataValues.forward) {
                const forwardAllBot = await db.bots.findAll({
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
                    {
                      model: db.botContact,
                      as: "botcontact",
                      include: [
                        {
                          model: db.sales,
                          as: "sales",
                        },
                      ],
                    },
                  ],
                  where: {
                    id_menuAktif: allMenuBots[i].dataValues.id_prevMenu,
                    id_key: allMenuBots[i].dataValues.id_prevKey,
                  },
                });
                const newMsgAllForward =
                  forwardAllBot[0].dataValues.message.replace(
                    "{name}",
                    isResult[0].dataValues.name
                  );
                if (newMsgAllForward !== "") {
                  msg.reply(newMsgAllForward);
                }

                if (forwardAllBot[0].dataValues.urifiles.length > 0) {
                  for (
                    let b = 0;
                    b < forwardAllBot[0].dataValues.urifiles.length;
                    b++
                  ) {
                    const mediaAll = await MessageMedia.fromUrl(
                      forwardAllBot[0].dataValues.urifiles[b].name
                    );
                    chat.sendMessage(mediaAll);
                  }
                }
              }

              if (allMenuBots[i].dataValues.urifiles.length > 0) {
                for (
                  let j = 0;
                  j < allMenuBots[i].dataValues.urifiles.length;
                  j++
                ) {
                  const media2all = await MessageMedia.fromUrl(
                    allMenuBots[i].dataValues.urifiles[j].name
                  );
                  chat.sendMessage(media2all);
                }
              }
              const updateCustomerAll = {
                id_menuAktif: allMenuBots[i].id_afterMenu,
                id_prevMenu: allMenuBots[i].id_prevMenu,
                id_prevKey: allMenuBots[i].id_prevKey,
              };
              await Customer.update(updateCustomerAll, {
                where: { phone: chat.id.user },
              }).then(async () => {
                io.emit("customers", await newCustomer());
              });
            }
          }

          // // FORWARD KONTAK
          // const salesGroup = await db.salesGroup.findOne({
          //   where: { id: 7 },
          //   include: [
          //     {
          //       model: db.sales,
          //       as: "sales",
          //     },
          //   ],
          // });
          // if (salesGroup !== null) {
          //   if (salesGroup.dataValues.sales.length > 0) {
          //     for (let k = 0; k < salesGroup.dataValues.sales.length; k++) {
          //       // Kirim pesan & kontak customer ke sales
          //       const number = salesGroup.dataValues.sales[k].dataValues.phone;
          //       const chatId = "62" + number.substring(1) + "@c.us";
          //       let contactin = await client.getContactById(chatId);
          //       msg.reply(contactin);
          //       // let statusContact = await client.isRegisteredUser(chatId);
          //       // Kirim pesan dan komtak sales ke Customer
          //       // Kirim kontak customer ke sales
          //       client.sendMessage(
          //         phoneNumberFormatter(number),
          //         await msg.getContact()
          //       );
          //       //End Kirim kontak customer ke sales
          //     }
          //   }
          // }
          // // END FORWARD KONTAK
        } else {
          const kata =
            "Maaf vika tidak menemukan kata kunci yang kamu masukan. \r\nSilahkan pilih menu diatas atau ketik *.home* untuk kembali ke halaman utama 🙏🏻";
          msg.reply(kata);
        }
      }

      // Ganti nama dan kota
      if (userTyping.substring(0, 1) == "#") {
        updateValue = {
          name: userTyping.substring(1, 255),
          // kota: userTyping.substring(index_ + 1, 255),
        };
        await Customer.update(updateValue, {
          where: { phone: chat.id.user },
        }).then(async () => {
          io.emit("customers", await newCustomer());
        });

        msg.reply(
          "Sekarang kami akan memanggil kamu : " + userTyping.substring(1, 255)
        );
        // msg.reply("Kota  : " + userTyping.substring(index_ + 1, 255));
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
      // if ((msg.body = "$kontak" && !chat.isGroup)) {
      //   var isContact = [...contact];
      //   // isContact.number = "085700000000";
      //   // isContact.verifiedName = "cobain doang";
      //   // isContact.isBusiness = false;
      //   // isContact.id.user = "085700000000";
      //   // isContact.id._serialized = "085700000000@c.us";
      //   console.log(isContact);
      //   console.log(contact);
      //   msg.reply(contact);
      //   // msg.reply(isContact);
      // }
      // // End kirim kontak
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

      {
        model: db.botContact,
        as: "botcontact",
        include: [
          {
            model: db.sales,
            as: "sales",
            include: [{ model: db.salesGroup, as: "group" }],
          },
        ],
      },
    ],
    order: [["id_menuAktif", "ASC"]],
  });
  const session = await db.sessions.findAll();

  const Sales = await db.sales.findAll({
    include: [
      {
        model: db.salesGroup,
        as: "group",
      },
    ],
    order: [["name", "ASC"]],
  });

  const SalesGroup = await db.salesGroup.findAll({
    include: [
      {
        model: db.sales,
        as: "sales",
        include: [{ model: db.salesGroup, as: "group" }],
      },
    ],
    order: [["name", "ASC"]],
  });

  if (session.length > 0) {
    if (socket) {
      socket.emit("init", session);
      socket.emit("bots", bots);
      socket.emit("customers", Customer);
      socket.emit("sales", Sales);
      socket.emit("salesgroup", SalesGroup);
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

app.get("/tes", async (req, res) => {
  const forwardAllBot = await db.bots.findAll({
    include: [
      {
        model: db.keys,
        as: "key",
      },
      {
        model: db.keys,
        as: "prevKey",
      },
      {
        model: db.menu,
        as: "menuAktif",
      },
      {
        model: db.menu,
        as: "prevMenu",
      },
      {
        model: db.menu,
        as: "afterMenu",
      },
      {
        model: db.urifiles,
        as: "urifiles",
      },
      {
        model: db.botContact,
        as: "botcontact",
        include: [
          {
            model: db.sales,
            as: "sales",
          },
        ],
      },
    ],
  });
  console.log(forwardAllBot.length);
  res.json(forwardAllBot);
});

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
const salesRouter = require("./routes/sales");
const salesGroupRouter = require("./routes/salesGroup");
const botContactRouter = require("./routes/botContact");

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
app.use("/sales", salesRouter);
app.use("/salesgroup", salesGroupRouter);
app.use("/botContact", botContactRouter);

// End

server.listen(port, () => {
  console.log(`Listening port : ${port}`);
});
