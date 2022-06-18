const db = require("../models");

const Menu = db.menu;

const newMenu = async () => {
  return await Menu.findAll({
    order: [["name", "ASC"]],
  });
};

const create = async (req, res) => {
  let data = {
    name: req.body.name,
  };

  const menu = await Menu.create(data);
  req.socket.emit("menus", await newMenu());
  res.status(200).send(menu);
};

const getAllMenu = async (req, res) => {
  let menu = await Menu.findAll({
    order: [["name", "ASC"]],
  });
  req.socket.emit("menus", await newMenu());
  res.send(menu);
};

const getOneMenu = async (req, res) => {
  let id = req.params.id;
  let menu = await Menu.findOne({ where: { id: id } });
  res.status(200).send(menu);
};

const updateMenu = async (req, res) => {
  let id = req.params.id;
  const menu = await Menu.update(req.body, { where: { id: id } });
  req.socket.emit("menus", await newMenu());
  res.status(200).send(menu);
};

const deleteMenu = async (req, res) => {
  let id = req.params.id;
  await Menu.destroy({ where: { id: id } });
  req.socket.emit("menus", await newMenu());
  res.status(200).send("keys is deleted");
};

module.exports = {
  create,
  getAllMenu,
  getOneMenu,
  updateMenu,
  deleteMenu,
};
