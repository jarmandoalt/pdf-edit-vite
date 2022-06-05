const mongoose = require ('mongoose')
const { Schema } = mongoose
const { appConfig } = require ('../config')

const schemaPdf = new Schema ({
    title: String,
    posTitle: Number,
    sizeTitle: Number,
    body: String,
    image: String,
    posImg: Number,
    sizeImg: Number,
    firma: Number,
    access: Number,
    idaccess: String,
    team: String,
    valueName: String,
    valueNomina: String,
    valueFechaIngreso: String,
    valueFechaSalida: String,
    valuePuesto: String,
    date: String,
    valueFecha: String,
    imgX: String,
    imgY: String,
    imgH: String,
    imgW: String,
    imgScroll: String
},{
    timestamps: true
})

schemaPdf.methods.setImgUrl = function setImagUrl (filename) {
    const { host, port } = appConfig
    this.image = `${host}:${port}/public/${filename}`
    
}

module.exports = mongoose.model('Pdf', schemaPdf)