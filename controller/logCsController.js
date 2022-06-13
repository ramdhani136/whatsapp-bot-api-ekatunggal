// const { io } = require("../app");
const db = require("../models");

const LogCs = db.logcs;

const newLog = async () => {
  return await LogCs.findAll({
    order: [["id", "DESC"]],
    include: [
      {
        model: db.sales,
        as: "sales",
      },
    ],
  });
};

const create = async (req, res) => {
  let data = {
    name: req.body.name,
    id_sales: req.body.id_sales,
    id_customer: req.body.id_customer,
    status: req.body.status,
    keterangan: req.body.keterangan,
    city: req.body.city,
    interest: req.body.interest,
    closeAt: req.body.closeAt,
  };

  const logcs = await LogCs.create(data);
  // req.socket.emit("logcs", await newLog());
  res.send(logcs);
};

const getAllLog = async (req, res) => {
  let logs = await LogCs.findAll({ include: { model: db.sales, as: "sales" } });
  res.send(logs);
};

const getOneLog = async (req, res) => {
  let id = req.params.id;
  let logs = await LogCs.findOne({ where: { model: db.sales, as: "sales" } });
  res.status(200).send(logs);
};

const getByCust = async (req, res) => {
  let id = req.params.id;
  let logs = await LogCs.findAll({
    include: [
      {
        model: db.sales,
        as: "sales",
      },
    ],
    where: { id_customer: id },
  });
  res.status(200).send(logs);
};

const updateLog = async (req, res) => {
  let id = req.params.id;
  const logs = await LogCs.update(req.body, { where: { id: id } });
  req.socket.emit("logs", await newLog());
  res.status(200).send(logs);
};

const deleteLog = async (req, res) => {
  let id = req.params.id;
  await LogCs.destroy({ where: { id: id } });
  req.socket.emit("logs", await newLog());
  res.status(200).send("logs is deleted");
};

module.exports = {
  create,
  getAllLog,
  getOneLog,
  updateLog,
  deleteLog,
  getByCust,
};
