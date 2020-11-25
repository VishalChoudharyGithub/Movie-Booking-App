const express = require('express');
const genres = require("../routes/genres");
const customers = require("../routes/customers");
const home = require("../routes/home");
const users = require("../routes/users");
const movies = require("../routes/movies")
const rentals = require("../routes/rentals");
const auth = require("../routes/auth");
const error = require('../middlewares/error');

module.exports = function(app){
    app.use(express.json())
    app.use("/api/genres",genres)
    app.use("/api/customers",customers);
    app.use("/",home);
    app.use("/api/movies",movies);
    app.use("/api/rentals",rentals);
    app.use("/api/users",users)
    app.use('/api/auth',auth)

    app.use(error);
}