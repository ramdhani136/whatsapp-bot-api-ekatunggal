const db = require("../models");
// const { io } = require("../config/socket");

const Bots = db.bots;

const create = async (req, res) => {
  let data = {
    id_key: req.body.id_key,
    key: req.body.key,
    message: req.body.message,
    status: req.body.status,
  };

  const bots = await Bots.create(data);

  res.status(200).send(bots);
};

const getAllBots = async (req, res) => {
  // io.emit("tes", "halo");
  let bots = await Bots.findAll({
    order: [["id", "DESC"]],
  });
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
  res.status(200).send(bot);
};

const deleteBot = async (req, res) => {
  let id = req.params.id;
  await Bots.destroy({ where: { id: id } });
  res.status(200).send("keys is deleted");
};

module.exports = {
  create,
  getAllBots,
  getOneBot,
  updateBot,
  deleteBot,
};
