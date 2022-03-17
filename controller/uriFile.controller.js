const db = require("../models");

const UriFile = db.urifiles;

const create = async (req, res) => {
  let data = {
    name: req.body.name,
    id_bot: req.body.id_bot,
    id_key: req.body.id_key,
    key: req.body.key,
    id_menu: req.body.id_menu,
    menu: req.body.menu,
  };

  const urifile = await UriFile.create(data);
  res.status(200).send(urifile);
};

const getAllUri = async (req, res) => {
  let urifile = await UriFile.findAll({});
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
  res.status(200).send(urifile);
};

const deleteUri = async (req, res) => {
  let id = req.params.id;
  await UriFile.destroy({ where: { id: id } });
  res.status(200).send("keys is deleted");
};

module.exports = {
  create,
  getAllUri,
  getOneUri,
  updateUri,
  deleteUri,
};
