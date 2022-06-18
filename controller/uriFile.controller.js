const db = require("../models");

const UriFile = db.urifiles;
const Bots = db.bots;

const newBots = async () => {
  return await Bots.findAll({
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
    name: req.body.name,
    id_bot: req.body.id_bot,
  };
  let newUrifile = await UriFile.findAll({
    include: [
      {
        model: Bots,
        as: "bots",
      },
    ],
  });

  const urifile = await UriFile.create(data);
  req.socket.emit("urifiles", newUrifile);
  req.socket.emit("bots", await newBots());
  res.status(200).send(urifile);
};

const getAllUri = async (req, res) => {
  let urifile = await UriFile.findAll({
    include: [
      {
        model: Bots,
        as: "bots",
      },
    ],
  });
  req.socket.emit("urifiles", newUrifile);
  req.socket.emit("bots", await newBots());
  res.send(urifile);
};

const getOneUri = async (req, res) => {
  let id = req.params.id;
  let urifile = await UriFile.findOne({ where: { id: id } });
  res.status(200).send(urifile);
};

const updateUri = async (req, res) => {
  let id = req.params.id;
  const urifile = await UriFile.update(req.body, { where: { id: id } });
  let newUrifile = await UriFile.findAll({
    include: [
      {
        model: Bots,
        as: "bots",
      },
    ],
  });
  req.socket.emit("urifiles", newUrifile);
  res.status(200).send(urifile);
};

const deleteUri = async (req, res) => {
  let id = req.params.id;
  await UriFile.destroy({ where: { id: id } });
  let newUrifile = await UriFile.findAll({
    include: [
      {
        model: Bots,
        as: "bots",
      },
    ],
  });
  req.socket.emit("urifiles", newUrifile);
  res.status(200).send("file is deleted");
};

const deleteAllByBot = async (req, res) => {
  let id = req.params.id;
  await UriFile.destroy({ where: { id_bot: id } });
  req.socket.emit("bots", await newBots());
  res.status(200).send("file is deleted");
};

module.exports = {
  create,
  getAllUri,
  getOneUri,
  updateUri,
  deleteUri,
  deleteAllByBot,
};
