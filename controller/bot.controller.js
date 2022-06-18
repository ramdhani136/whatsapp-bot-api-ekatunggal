// const { io } = require("../app");
const db = require("../models");

const Bots = db.bots;
const Keys = db.keys;
const Menu = db.menu;
const UriFiles = db.urifiles;
const BotContact = db.botContact;

const newBots = async () => {
  return await Bots.findAll({
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

const create = async (req, res) => {
  let data = {
    id_key: req.body.id_key,
    id_menuAktif: req.body.id_menuAktif,
    id_prevKey: req.body.id_prevKey,
    id_prevMenu: req.body.id_prevMenu,
    id_afterMenu: req.body.id_afterMenu,
    message: req.body.message,
    sales_message: req.body.sales_message,
    status: req.body.status,
    forward: req.body.forward,
    interest: req.body.interest,
    city: req.body.city,
  };

  const bots = await Bots.create(data);
  req.socket.emit("bots", await newBots());

  res.status(200).send(bots);
};

const getAllBots = async (req, res) => {
  let bots = await Bots.findAll({
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
  req.socket.emit("bots", await newBots());

  res.send(bots);
};

const getOneBot = async (req, res) => {
  let id = req.params.id;
  let bots = await Bots.findOne({ where: { id: id } });
  res.status(200).send(bots);
};

const updateBot = async (req, res) => {
  let id = req.params.id;
  const bot = await Bots.update(req.body, { where: { id: id } });
  req.socket.emit("bots", await newBots());
  res.status(200).send(bot);
};

const deleteBot = async (req, res) => {
  let id = req.params.id;
  await Bots.destroy({ where: { id: id } });
  req.socket.emit("bots", await newBots());
  res.status(200).send("keys is deleted");
};

module.exports = {
  create,
  getAllBots,
  getOneBot,
  updateBot,
  deleteBot,
};
