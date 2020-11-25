require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');

module.exports = function(){
    //Error handling
    // process.on('uncaughtException',(ex)=>{
    //     console.log("uncaught exception");
    //     winston.error(err.message,err);
    //     process.exit(1);
    // })   or
    winston.handleExceptions(
        new winston.transports.Console({colorize:true,prettyPrint:true}),
        new winston.transports.File({filename:'uncaughtExceptions.log'})
    )
    process.on('unhandledRejection',(ex)=>{
        throw ex;    //now winston will handle that exception(using above method)
    })  

    winston.add(winston.transports.File,{filename:'logfile.log'});
    winston.add(winston.transports.MongoDB,{
        db:'mongodb://localhost/vidly',
        level:'error'
    });
}