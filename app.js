const express = require ('express')
const cors = require ('cors')
const pdfRoutes = require ('./routes/pdfRoute')
const userRoute = require ('./routes/userRoute')
const teamRoute = require ('./routes/teamRoute')

const app = express()

app.use(express.urlencoded())
app.use(cors())
app.use(express.json())


app.use('/public', express.static(`${__dirname}/storage/imgs`))
app.use('/v1', pdfRoutes)
app.use('/v2', userRoute)
app.use('/v3', teamRoute)


module.exports = app