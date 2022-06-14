const {
  Client,
  MessageMedia,
  LocalAuth,
  // LegacySessionAuth,
} = require("whatsapp-web.js");
const express = require("express");
const qrcode = require("qrcode");
const fs = require("fs");
const http = require("http");
const { phoneNumberFormatter } = require("./utils/formatter");
// const axios = require("axios");
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
  });

  client.on("auth_failure", async (session) => {
    io.emit("message", { id: id, text: "Auth eror ,restarting..." });
    client.destroy();
    client.initialize();
  });

  client.on("disconnected", async (reason) => {
    io.emit("message", { id: id, text: "Whatsapp is disconnected!" });
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

              const newCity = newMsg.replace(
                "{city}",
                Bots[i].dataValues.city === null ||
                  Bots[i].dataValues.city === ""
                  ? isResult[0].dataValues.kota === null ||
                    isResult[0].dataValues.kota === ""
                    ? "Not Set"
                    : isResult[0].dataValues.kota
                  : Bots[i].dataValues.city
              );

              const newIntr = newCity.replace(
                "{interest}",
                Bots[i].dataValues.interest === null ||
                  Bots[i].dataValues.interest === ""
                  ? isResult[0].dataValues.item === null ||
                    isResult[0].dataValues.item === ""
                    ? "Not Set"
                    : isResult[0].dataValues.item
                  : Bots[i].dataValues.interest
              );

              if (newMsg !== "") {
                msg.reply(newIntr);
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
                    msg.reply(
                      `Kontak : ${Bots[i].dataValues.botcontact[b].sales.dataValues.name}`
                    );
                    msg.reply(contactin);
                  }

                  const noReg = await db.logcs.findOne({
                    order: [["name", "DESC"]],
                  });

                  if (noReg) {
                    const reg = noReg.dataValues.name.substring(
                      3,
                      noReg.dataValues.name.length
                    );

                    var isReg = `sls${paddy(parseInt(reg) + 1, 5).toString()}`;
                  }

                  // CREATE LOGCS
                  valueLog = {
                    name: noReg ? isReg : "sls00001",
                    id_sales:
                      Bots[i].dataValues.botcontact[b].sales.dataValues.id,
                    id_customer: IsCustomer.dataValues.id,
                    city:
                      Bots[i].dataValues.city === null ||
                      Bots[i].dataValues.city === ""
                        ? IsCustomer.dataValues.kota === null ||
                          IsCustomer.dataValues.kota === ""
                          ? "Not Set"
                          : IsCustomer.dataValues.kota
                        : Bots[i].dataValues.city,
                    interest:
                      Bots[i].dataValues.interest === null ||
                      Bots[i].dataValues.interest === ""
                        ? IsCustomer.dataValues.item === null ||
                          IsCustomer.dataValues.item === ""
                          ? "Not Set"
                          : IsCustomer.dataValues.item
                        : Bots[i].dataValues.interest,
                  };
                  console.log(valueLog);
                  await db.logcs.create(valueLog).then((res) => {
                    console.log(res.dataValues.name);
                    client.sendMessage(
                      phoneNumberFormatter(number),
                      `Register Number : ${res.dataValues.name}`
                    );
                  });

                  // END LOGCS

                  // End Kirim pesan & kontak sales ke customer

                  if (Bots[i].dataValues.sales_message !== null) {
                    const newMsg = Bots[i].dataValues.sales_message.replace(
                      "{name}",
                      isResult[0].dataValues.name
                    );
                    const newCity = newMsg.replace(
                      "{city}",
                      Bots[i].dataValues.city === null ||
                        Bots[i].dataValues.city === ""
                        ? isResult[0].dataValues.kota === null ||
                          isResult[0].dataValues.kota === ""
                          ? "Not Set"
                          : isResult[0].dataValues.kota
                        : Bots[i].dataValues.city
                    );

                    const newIntr = newCity.replace(
                      "{interest}",
                      Bots[i].dataValues.interest === null ||
                        Bots[i].dataValues.interest === ""
                        ? isResult[0].dataValues.item === null ||
                          isResult[0].dataValues.item === ""
                          ? "Not Set"
                          : isResult[0].dataValues.item
                        : Bots[i].dataValues.interest
                    );
                    client.sendMessage(phoneNumberFormatter(number), newIntr);
                  }
                  client.sendMessage(
                    phoneNumberFormatter(number),
                    await msg.getContact()
                  );
                  //End Kirim kontak customer ke sales
                }
              }

              if (
                Bots[i].dataValues.interest !== "" &&
                Bots[i].dataValues.interest !== null
              ) {
                await Customer.update(
                  { item: Bots[i].dataValues.interest },
                  {
                    where: { phone: chat.id.user },
                  }
                ).then(async () => {
                  io.emit("customers", await newCustomer());
                });
              }
              if (
                Bots[i].dataValues.city !== "" &&
                Bots[i].dataValues.city !== null
              ) {
                await Customer.update(
                  { kota: Bots[i].dataValues.city },
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

              const newAllCity = newAllMsg.replace(
                "{city}",
                allMenuBots[i].dataValues.city === null ||
                  allMenuBots[i].dataValues.city === ""
                  ? isResult[0].dataValues.kota === null ||
                    isResult[0].dataValues.kota === ""
                    ? "Not Set"
                    : isResult[0].dataValues.kota
                  : allMenuBots[i].dataValues.city
              );

              const newAllIntr = newAllCity.replace(
                "{interest}",
                allMenuBots[i].dataValues.interest === null ||
                  allMenuBots[i].dataValues.interest === ""
                  ? isResult[0].dataValues.item === null ||
                    isResult[0].dataValues.item === ""
                    ? "Not Set"
                    : isResult[0].dataValues.item
                  : allMenuBots[i].dataValues.interest
              );
              if (newAllMsg !== "") {
                msg.reply(newAllIntr);
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

                const newAllCityForward = newMsgAllForward.replace(
                  "{city}",
                  forwardAllBot[0].dataValues.city === null ||
                    forwardAllBot[0].dataValues.city === ""
                    ? isResult[0].dataValues.kota === null ||
                      isResult[0].dataValues.kota === ""
                      ? "Not Set"
                      : isResult[0].dataValues.kota
                    : forwardAllBot[0].dataValues.city
                );

                const newAllIntrForward = newAllCityForward.replace(
                  "{interest}",
                  forwardAllBot[0].dataValues.interest === null ||
                    forwardAllBot[0].dataValues.interest === ""
                    ? isResult[0].dataValues.item === null ||
                      isResult[0].dataValues.item === ""
                      ? "Not Set"
                      : isResult[0].dataValues.item
                    : forwardAllBot[0].dataValues.interest
                );

                if (newMsgAllForward !== "") {
                  msg.reply(newAllIntrForward);
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
        } else {
          const kata =
            "Maaf vika tidak menemukan kata kunci yang kamu masukan. \r\nSilahkan pilih menu diatas atau ketik *.home* untuk kembali ke halaman utama 🙏🏻";
          msg.reply(kata);
        }
      }

      // Ganti nama
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
      // End Ganti Nama

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

      // Update status log sales
      if (userTyping.substring(0, 5).toLowerCase() == "close") {
        const newData = userTyping.split("_");
        if (newData.length === 4) {
          // const isCustomer = await db.customers.findOne({
          //   where: { phone: chat.id.user },
          // });
          const lognya = await db.logcs.findOne({
            where: { name: newData[1] },
            include: [
              {
                model: db.sales,
                as: "sales",
              },
            ],
          });
          if (lognya) {
            if (!lognya.dataValues.status) {
              const chatId =
                "62" +
                lognya.dataValues.sales.dataValues.phone.substring(1) +
                "@c.us";
              const salesContact = await client.getContactById(chatId);
              if (salesContact.id.user === chat.id.user) {
                // Update customer
                await db.customers.update(
                  { name: newData[2] },
                  { where: { id: lognya.dataValues.id_customer } }
                );
                io.emit("customers", await newCustomer());
                // End
                // Update logcs
                await db.logcs.update(
                  {
                    status: 1,
                    keterangan: newData[3],
                    closeAt: new Date().toLocaleString(),
                  },
                  { where: { name: newData[1] } }
                );
                msg.reply("Laporannya sudah vika terima ya , terima kasih :) ");
                // End
              } else {
                msg.reply(
                  "Gagal, Case hanya bisa di close oleh no wa yang terdaftar untuk case tersebut kaka :) "
                );
              }
            } else {
              msg.reply(
                "Tidak bisa mengupdate kembali laporan ,Case ini sudah di close oleh kaka sebelumnya :) "
              );
            }
          } else {
            msg.reply(
              "Nomor Register tidak di ada di sistem kaka , Silahkan di cek ulang kembali :) "
            );
          }
        } else {
          msg.reply("Cek kembali format laporannya ya kaka :)");
        }
      }
      // End Update status log sales
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

  const AllKeys = await Keys.findAll({
    order: [["id", "ASC"]],
  });

  const AllMenu = await Menu.findAll({
    order: [["id", "ASC"]],
  });

  if (session.length > 0) {
    if (socket) {
      socket.emit("init", session);
      socket.emit("bots", bots);
      socket.emit("customers", Customer);
      socket.emit("sales", Sales);
      socket.emit("salesgroup", SalesGroup);
      socket.emit("keys", AllKeys);
      socket.emit("menus", AllMenu);
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
const logCsRouter = require("./routes/logCs");
const { paddy } = require("./helper/paddy");

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
app.use("/logcs", logCsRouter);

// End

server.listen(port, () => {
  console.log(`Listening port : ${port}`);
});
