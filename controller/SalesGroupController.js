// const { io } = require("../app");
const db = require("../models");

const SalesGroup = db.salesGroup;
const Sales = db.sales;

const newSalesGroup = async () => {
  return await SalesGroup.findAll({
    order: [["name", "ASC"]],
  });
};

const create = async (req, res) => {
  let data = {
    name: req.body.name,
    notes: req.body.notes,
    status: req.body.status,
  };

  const salesGroups = await SalesGroup.create(data);
  req.socket.emit("salesgroup", await newSalesGroup());

  res.status(200).send(salesGroups);
};

const getAllSalesGroup = async (req, res) => {
  let salesGroup = await SalesGroup.findAll({
    include: [
      {
        model: Sales,
        as: "sales",
      },
    ],
    order: [["name", "ASC"]],
  });
  res.send(salesGroup);
};

const getOneSalesGroup = async (req, res) => {
  let id = req.params.id;
  let salesGroup = await SalesGroup.findOne({ where: { id: id } });
  res.status(200).send(salesGroup);
};

const updateSalesGroup = async (req, res) => {
  let id = req.params.id;
  const salesGroup = await SalesGroup.update(req.body, { where: { id: id } });
  req.socket.emit("salesgroup", await newSalesGroup());
  res.status(200).send(salesGroup);
};

const deleteSalesGroup = async (req, res) => {
  let id = req.params.id;
  await SalesGroup.destroy({ where: { id: id } });
  req.socket.emit("salesgroup", await newSalesGroup());
  res.status(200).send("keys is deleted");
};

module.exports = {
  create,
  getAllSalesGroup,
  getOneSalesGroup,
  updateSalesGroup,
  deleteSalesGroup,
};
