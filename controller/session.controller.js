exports.create = async (req, res) => {
  res.send({
    message: "OK",
  });
};

exports.findAll = async (req, res) => {
  res.send({ message: "OK find all" });
};
