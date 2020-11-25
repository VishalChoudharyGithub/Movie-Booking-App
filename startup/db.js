const winston = require('winston');
const mongoose = require("mongoose");

module.exports = function(){
    mongoose.connect('mongodb://localhost/vidlyDatabase',{useNewUrlParser:true , useUnifiedTopology:true})
    .then( () => {winston.info('connected to MongoDb...')})

}