const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Users = db.users;

const newUsers = async () => {
  return await Users.findAll({
    order: [["name", "ASC"]],
  });
};

const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "name", "username", "email", "status"],
    });
    req.socket.emit("users", await newUsers());
    res.json(users);
  } catch (err) {
    res.json(err);
  }
};

const register = async (req, res) => {
  const { name, username, email, password, confpassword } = req.body;
  if (password !== confpassword)
    return res.status(400).json({
      status: false,
      message: "Password dan confirm password tidak cocok",
    });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    const user = await Users.create({
      name: name,
      email: email,
      username: username,
      password: hashPassword,
    });
    req.socket.emit("users", await newUsers());
    res.status(200).send(user);
  } catch (error) {
    res.json(error);
  }
};

const login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: { username: req.body.username },
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match)
      return res.status(400).json({ status: false, msg: "Wrong Password" });
    const userId = user[0].id;
    const name = user[0].name;
    const username = user[0].username;
    const email = user[0].email;
    const accessToken = jwt.sign(
      { userId, name, username, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
      }
    );

    const refreshToken = jwt.sign(
      { userId, name, username, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    await Users.update(
      { refresh_token: refreshToken },
      { where: { id: userId } }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ status: false, msg: "User not found!" });
  }
};

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    const user = await Users.findAll({
      where: { refresh_token: refreshToken },
    });
    if (!user[0]) return res.sendStatus(403);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return sendStatus(403);
        const userId = user[0].id;
        const name = user[0].name;
        const username = user[0].username;
        const email = user[0].email;

        const accessToken = jwt.sign(
          { userId, name, username, email },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "20s",
          }
        );

        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findAll({
    where: { refresh_token: refreshToken },
  });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await Users.update({ refresh_token: null }, { where: { id: userId } });
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};

module.exports = {
  getUsers,
  register,
  login,
  refreshToken,
  logout,
};
