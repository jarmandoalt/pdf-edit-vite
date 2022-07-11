const mongoose = require ('mongoose')
const { Schema } = mongoose

const schemaTeam = new Schema ({
    name: String
},{
    timestamps: true
})

module.exports = mongoose.model('Team', schemaTeam)