const express = require ('express')
const upload = require ('../libs/storage')
const { addPdf, getPdf, deletePdf } = require ('../controllers/pdfControll')
const api = express.Router()


api.delete('/new', deletePdf)
api.post('/new', upload.single('image'), addPdf)
api.get('/new', getPdf)

module.exports = api

