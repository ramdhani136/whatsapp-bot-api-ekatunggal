// const { Session } = require("../models/sessionModel");
const db = require("../models");

const Session = db.sessions;

const create = async (req, res) => {
  let data = {
    name: req.body.name,
    deskripsi: req.body.deskripsi,
    username: req.body.username,
    password: req.body.password,
  };

  const session = await Session.create(data);
  res.status(200).send(session);
};

const getAllSessions = async (req, res) => {
  let sessions = await Session.findAll({});
  res.send(sessions);
};

const getOneSession = async (req, res) => {
  let id = req.params.id;
  let session = await Session.findOne({ where: { id: id } });
  res.status(200).send(session);
};

const updateSession = async (req, res) => {
  let id = req.params.id;
  const session = await Session.update(req.body, { where: { id: id } });
  res.status(200).send(session);
};

const deleteSession = async (req, res) => {
  let id = req.params.id;
  await Session.destroy({ where: { id: id } });
  res.status(200).send("Session is deleted");
};

module.exports = {
  create,
  getAllSessions,
  getOneSession,
  updateSession,
  deleteSession,
};
