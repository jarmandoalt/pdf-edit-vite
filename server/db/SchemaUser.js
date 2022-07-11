const mongoose = require ('mongoose')
const { Schema } = mongoose

const schemaUser = new Schema ({
    name: String,
    lastname: String,
    username: String,
    password: String,
    team: String,
    position: String
},{
    timestamps: true
})

module.exports = mongoose.model('User', schemaUser)