const express = require ('express')
const upload = require ('../libs/storage')
const { addPdf, getPdf, deletePdf, getPdfId, deletePdfTeam } = require ('../controllers/pdfControll')
const api = express.Router()


api.delete('/new', deletePdf)
api.delete('/newTeam', deletePdfTeam)
api.post('/new', upload.single('image'), addPdf)
api.get('/new', getPdf)
api.get('/newId', getPdfId)

module.exports = api

