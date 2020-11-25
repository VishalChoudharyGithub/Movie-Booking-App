// modules
const express = require("express");
const winston = require('winston');

//express
const app = express();

//startup
require('./startup/logging')();  //called in starting so it can listen to errors right from start
require("./startup/routes")(app);
require("./startup/db")();
require('./startup/config')();
require('./startup/validation')();

//server setup
const port = process.env.port || 3000;
app.listen(port, () => { 
    winston.info(`connected to port ${port}`);
 })