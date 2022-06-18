const db = require("../models");

const Customer = db.customers;
const Keys = db.keys;
const Menu = db.menu;

const newCustomer = async () => {
  return await Customer.findAll({
    order: [["id", "DESC"]],
    include: [
      {
        model: Menu,
        as: "menuAktif",
      },
      {
        model: Menu,
        as: "prevMenu",
      },
      {
        model: Keys,
        as: "prevKey",
      },
    ],
  });
};

const create = async (req, res) => {
  let data = {
    name: req.body.name,
    phone: req.body.phone,
    deskripsi: req.body.deskripsi,
    id_menuAktif: req.body.id_menuAktif,
    id_prevMenu: req.body.prevMenu,
    afterMenu: req.body.afterMenu,
    item: req.body.item,
    status: req.body.status,
  };

  const customers = await Customer.create(data);
  req.socket.emit("customers", await newCustomer());

  res.status(200).send(customers);
};

const getAllCustomers = async (req, res) => {
  let customers = await Customer.findAll({
    order: [["id", "DESC"]],
    include: [
      {
        model: Menu,
        as: "menuAktif",
      },
      {
        model: Menu,
        as: "prevMenu",
      },
      {
        model: Keys,
        as: "prevKey",
      },
    ],
  });
  req.socket.emit("customers", await newCustomer());
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
  req.socket.emit("customers", await newCustomer());
  res.status(200).send(customers);
};

const deleteCustomer = async (req, res) => {
  let id = req.params.id;
  await Customer.destroy({ where: { id: id } });
  req.socket.emit("customers", await newCustomer());
  res.status(200).send("keys is deleted");
};

module.exports = {
  create,
  getAllCustomers,
  getOneCustomer,
  updateCustomer,
  deleteCustomer,
};
