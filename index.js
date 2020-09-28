// Import packages
const express = require('express')
const morgan = require('morgan')
// App
const app = express()
// Morgan
app.use(morgan('tiny'))
// First route
app.use("/api", require("./api/routes/index.js"));
// Starting server
app.listen('3000');

console.log('application started on port: 3000');