// IMPORTING NECESSARY PACKAGES
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const cors = require('cors');

// INITIALIZING NECESSARY VARIABLES
const app = express();
const port = process.env.PORT || 8080;
require('./config.js')(app);

// INITIALIZING EXPRESS FRAMEWORK
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// INITIALIZING ROUTES FOR EXPRESS
require("./app")(app);

// EXPOSING THE PROGRAM ON PORT 8080
app.listen(port, () => console.log(`SERVER LISTENING ON PORT : ${port}`));