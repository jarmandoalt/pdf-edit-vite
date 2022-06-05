const express = require ('express')
const { addUser, getUser, getUserTeam, deleteUser } = require ('../controllers/userControll')
const api = express.Router()


api.delete('/log', deleteUser)
api.post('/log', addUser)
api.get('/log', getUser)
api.get('/logTeam', getUserTeam)

module.exports = api
