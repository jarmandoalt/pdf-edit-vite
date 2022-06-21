const User = require("../db/SchemaUser");

async function addUser(req, res) {

  try {
    const {
      name,
      lastname,
      username,
      password,
      team,
      position
    } = req.query;

    const users = User({
        name,
        lastname,
        username,
        password,
        team,
        position
    });

    const userStored = await users.save();
    res.status(201).send({ userStored });

  } catch (e) {
    res.status(500).send({ message: e.message });
  }
}

async function getUser(req, res) {
  let username = req.query.username, 
    password = req.query.password
    console.log(req.query);
  const users = await User.find({username:  username, password: password} );
  res.status(200).send({ users });
  console.log(users);
}

async function getUserTeam(req, res) {
  let team = req.query.team
  console.log(req.query);
  const users = await User.find({team: team} );
  res.status(200).send({ users });
}

async function deleteUser(req, res) {
  console.log(req.query);
  const id = req.query.id;
  try {
    const result = await User.findByIdAndDelete({ _id: `${id}` });

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

async function deleteUserTeam(req, res) {
  console.log(req.query.name);
  const name = req.query.name;
  try {
    const result = await User.deleteMany({ team: name });

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
  addUser,
  getUser,
  getUserTeam,
  deleteUser,
  deleteUserTeam
};
