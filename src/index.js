require('dotenv').config();
const express = require('express')
const routes = require('./routes/index')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('../swagger.json')
const cors = require('cors')
const fileUpload = require('express-fileupload');
const fs = require('fs');
const app = express()

app.use(fileUpload({
    createParentPath: true
}));

app.use(cors())

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/', routes)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

fs.writeFile(process.env.GOOGLE_APPLICATION_CREDENTIALS, process.env.GOOGLE_CREDENTIALS, (error, data) => {
    if (error) console.log(error);
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serveur à l'écoute ${port}`)
})
