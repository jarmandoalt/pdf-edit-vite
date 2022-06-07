const mongoose = require ('mongoose')
const { Schema } = mongoose
const { appConfig } = require ('../config')

const schemaPdf = new Schema ({
    title: String,
    body: String,
    imgUrl: String,
    firma: Number,
    access: Number,
    idaccess: String,
    team: String,
    valueImg: String,
    valueTitle: String,
    valueBody: String,
    valueLocation: String,
    valueFirmas: String,
    location: Number,
    nameFirma1: String,
    nameFirma2: String,
    nameFirma3: String,
    nameFirma4: String,
    nameFirma5: String,
},{
    timestamps: true
})

schemaPdf.methods.setImgUrl = function setImagUrl (filename) {
    const { host, port } = appConfig
    this.image = `${host}:${port}/public/${filename}`
    
}

module.exports = mongoose.model('Pdf', schemaPdf)