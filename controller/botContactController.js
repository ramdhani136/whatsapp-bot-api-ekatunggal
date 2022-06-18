// const { io } = require("../app");
const db = require("../models");

const BotContact = db.botContact;
const Sales = db.sales;
const SalesGroup = db.salesGroup;

const newBots = async () => {
  return await db.bots.findAll({
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
        model: BotContact,
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
};

const getBotContact = async () => {
  return await BotContact.findAll({
    // include: [
    //   {
    //     model: Keys,
    //     as: "key",
    //   },
    //   {
    //     model: Keys,
    //     as: "prevKey",
    //   },
    //   {
    //     model: Menu,
    //     as: "menuAktif",
    //   },
    //   {
    //     model: Menu,
    //     as: "prevMenu",
    //   },
    //   {
    //     model: Menu,
    //     as: "afterMenu",
    //   },
    //   {
    //     model: UriFiles,
    //     as: "urifiles",
    //   },
    // ],
  });
};

const getAllBotContact = async (req, res) => {
  let botContact = await BotContact.findAll({
    include: [
      {
        model: Sales,
        as: "sales",
        include: [
          {
            model: SalesGroup,
            as: "group",
          },
        ],
      },

      // {
      //   model: Keys,
      //   as: "prevKey",
      // },
      // {
      //   model: Menu,
      //   as: "menuAktif",
      // },
      // {
      //   model: Menu,
      //   as: "prevMenu",
      // },
      // {
      //   model: Menu,
      //   as: "afterMenu",
      // },
      // {
      //   model: UriFiles,
      //   as: "urifiles",
      // },
    ],
  });
  req.socket.emit("botContact", await getBotContact());
  res.send(botContact);
};

const create = async (req, res) => {
  let data = {
    id_bot: req.body.id_bot,
    id_sales: req.body.id_sales,
  };

  const botContact = await BotContact.create(data);
  // req.socket.emit("botContact", await getBotContact());
  req.socket.emit("botContact", await getBotContact());
  res.status(200).send(botContact);
};

const getOneBotContact = async (req, res) => {
  let id = req.params.id;
  let botContact = await BotContact.findOne({ where: { id: id } });
  res.status(200).send(botContact);
};

const updateBotContact = async (req, res) => {
  let id = req.params.id;
  const botContact = await BotContact.update(req.body, { where: { id: id } });
  req.socket.emit("botContact", await getBotContact());
  res.status(200).send(botContact);
};

const deleteBotContact = async (req, res) => {
  let id = req.params.id;
  await BotContact.destroy({ where: { id: id } });
  req.socket.emit("botContact", await getBotContact());
  res.status(200).send("botContact is deleted");
};

const deleteAllByBot = async (req, res) => {
  let id = req.params.id;
  await BotContact.destroy({ where: { id_bot: id } });
  req.socket.emit("bots", await newBots());
  res.status(200).send("contact is deleted");
};

module.exports = {
  create,
  getAllBotContact,
  getOneBotContact,
  updateBotContact,
  deleteBotContact,
  deleteAllByBot,
};
