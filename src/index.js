const express = require('express')
const app = express()
const routes = require('./routes/index')

app.use('/api/', routes)

app.listen(8080, () => {
    console.log("Serveur à l'écoute")
})