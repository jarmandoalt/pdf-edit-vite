require ('dotenv').config();
const app = require ('./app')
const connectdb = require ('./db/mongodb')
const { appConfig, dbConfig } = require ('./config')

app.set('port', process.env.PORT || 8000)

async function initApp (appConfig, dbConfig){
    try {
        await connectdb(dbConfig)
        app.listen(app.get('port'), () => {
            console.log(`server on port ${app.get('port')}`);
        })
    } catch (error) {
        console.error(error)
        process.exit(0);
    }
}

initApp(appConfig, dbConfig)