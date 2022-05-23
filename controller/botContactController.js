// const { io } = require("../app");
const db = require("../models");

const BotContact = db.botContact;
const Sales = db.sales;
const SalesGroup = db.salesGroup;

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
  res.send(botContact);
};

const create = async (req, res) => {
  let data = {
    id_bot: req.body.id_bot,
    id_sales: req.body.id_sales,
  };

  const botContact = await BotContact.create(data);
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

module.exports = {
  create,
  getAllBotContact,
  getOneBotContact,
  updateBotContact,
  deleteBotContact,
};
