const express = require ('express')
const upload = require ('../libs/storage')
const { addPdf, getPdf, deletePdf, getPdfId } = require ('../controllers/pdfControll')
const api = express.Router()


api.delete('/new', deletePdf)
api.post('/new', upload.single('image'), addPdf)
api.get('/new', getPdf)
api.get('/newId', getPdfId)

module.exports = api

