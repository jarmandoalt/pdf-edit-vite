const mongoose = require ('mongoose')


async function connectdb ({host,port,name}){
    //const uri = `${host}`
    const uri =  `mongodb://${host}:${port}/${name}`
    await mongoose.connect(uri, {useNewUrlParser: true})
}

module.exports = connectdb