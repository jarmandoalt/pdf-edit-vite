const Team = require("../db/SchemaTeam");

async function addTeam(req, res) {
  try {
    const {
      name
    } = req.query;

    const teams = Team({
        name
    });

    const userTeam = await teams.save();
    res.status(201).send({ userTeam });

  } catch (e) {
    res.status(500).send({ message: e.message });
  }
}

async function getTeam(req, res) {
  const teams = await Team.find();
  res.status(200).send({ teams });
}

async function deleteTeam(req, res) {
  const name = req.query.name;
  console.log(name);
  try {
    const result = await Team.deleteMany({ name: name });

    if (result) {
      res.json({
        estado: true,
        message: "eliminado",
      });
    } else {
      res.json({
        estado: false,
        message: "Fallo eliminar",
      });
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
    addTeam,
    getTeam,
    deleteTeam,
  };