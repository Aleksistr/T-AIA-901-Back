const express = require('express')
const routes = require('./routes/index')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('../swagger.json')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/api/', routes)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(8080, () => {
    console.log("Serveur à l'écoute")
})