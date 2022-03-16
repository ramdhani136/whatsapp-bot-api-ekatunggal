const db = require("../models");

const Keys = db.keys;
const UriFile = db.urifiles;
const Bots = db.bots;

const create = async (req, res) => {
  let data = {
    name: req.body.name,
  };

  const keys = await Keys.create(data);
  res.status(200).send(keys);
};

const getAllKeys = async (req, res) => {
  let keys = await Keys.findAll({
    order: [["name", "ASC"]],
  });
  res.send(keys);
};

const getOneKey = async (req, res) => {
  let id = req.params.id;
  let key = await Keys.findOne({ where: { id: id } });
  res.status(200).send(key);
};

const updateKey = async (req, res) => {
  let id = req.params.id;
  const key = await Keys.update(req.body, { where: { id: id } });
  res.status(200).send(key);
};

const deleteKey = async (req, res) => {
  let id = req.params.id;
  await Keys.destroy({ where: { id: id } });
  res.status(200).send("keys is deleted");
};

const getKeyUrlFiles = async (req, res) => {
  const data = await Keys.findAll({
    include: [
      {
        model: UriFile,
        as: "urifiles",
      },
      {
        model: Bots,
        as: "bots",
      },
    ],
    order: [["name", "ASC"]],
  });

  res.status(200).send(data);
};

module.exports = {
  create,
  getAllKeys,
  getOneKey,
  updateKey,
  deleteKey,
  getKeyUrlFiles,
};
