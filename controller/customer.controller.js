const db = require("../models");

const Customer = db.customers;

const create = async (req, res) => {
  let data = {
    name: req.body.name,
    phone: req.body.phone,
    deskripsi: req.body.deskripsi,
    key: req.body.key,
    item: req.body.item,
    status: req.body.status,
  };

  const customers = await Customer.create(data);

  res.status(200).send(customers);
};

const getAllCustomers = async (req, res) => {
  let customers = await Customer.findAll({
    order: [["id", "DESC"]],
  });
  res.send(customers);
};

const getOneCustomer = async (req, res) => {
  let id = req.params.id;
  let customers = await Customer.findOne({ where: { id: id } });
  res.status(200).send(customers);
};

const updateCustomer = async (req, res) => {
  let id = req.params.id;
  const customers = await Customer.update(req.body, { where: { id: id } });
  res.status(200).send(customers);
};

const deleteCustomer = async (req, res) => {
  let id = req.params.id;
  await Customer.destroy({ where: { id: id } });
  res.status(200).send("keys is deleted");
};

module.exports = {
  create,
  getAllCustomers,
  getOneCustomer,
  updateCustomer,
  deleteCustomer,
};
