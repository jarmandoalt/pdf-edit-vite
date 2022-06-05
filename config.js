const config = {
    appConfig:{
        port: process.env.APP_PORT,
        host: process.env.APP_HOST
    },
    dbConfig: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        name: process.env.DB_NAME       
    }
}

module.exports = config