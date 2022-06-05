const express = require ('express')
const { addTeam, getTeam, deleteTeam } = require ('../controllers/teamController')
const api = express.Router()


api.delete('/team', deleteTeam)
api.post('/team', addTeam)
api.get('/team', getTeam)

module.exports = api