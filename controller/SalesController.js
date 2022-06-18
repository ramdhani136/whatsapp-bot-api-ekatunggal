// const { io } = require("../app");
const db = require("../models");

const SalesGroup = db.salesGroup;
const Sales = db.sales;

const newSales = async () => {
  return await Sales.findAll({
    include: [
      {
        model: SalesGroup,
        as: "group",
      },
    ],
    order: [["name", "ASC"]],
  });
};

const create = async (req, res) => {
  let data = {
    name: req.body.name,
    id_group: req.body.id_group,
    status: req.body.status,
    phone: req.body.phone,
  };

  const saless = await Sales.create(data);
  req.socket.emit("sales", await newSales());

  res.status(200).send(saless);
};

const getAllSales = async (req, res) => {
  let saless = await Sales.findAll({
    include: [
      {
        model: SalesGroup,
        as: "group",
      },
    ],
    order: [["name", "ASC"]],
  });
  req.socket.emit("sales", await newSales());
  res.send(saless);
};

const getOneSales = async (req, res) => {
  let id = req.params.id;
  let saless = await Sales.findOne({ where: { id: id } });
  res.status(200).send(saless);
};

const updateSales = async (req, res) => {
  let id = req.params.id;
  const saless = await Sales.update(req.body, { where: { id: id } });
  req.socket.emit("sales", await newSales());
  res.status(200).send(saless);
};

const deleteSales = async (req, res) => {
  let id = req.params.id;
  await Sales.destroy({ where: { id: id } });
  req.socket.emit("sales", await newSales());
  res.status(200).send("keys is deleted");
};

module.exports = {
  create,
  getAllSales,
  getOneSales,
  updateSales,
  deleteSales,
};
