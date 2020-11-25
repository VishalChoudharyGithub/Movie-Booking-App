//imports
const express = require("express");
const {User,validate} = require("../models/user");
const _ = require("lodash");
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middlewares/auth");

//router
const router = express.Router();

//routes

router.get("/me",auth,async(req,res)=>{
    const user = await User.findById(req.user._id).select('-password');
})

router.post("/", async(req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({email:req.body.email});
    if(user) return res.status(400).send("user Already register...")

    user = new User(_.pick(req.body,['email','password','name']))
    const salt = await bcrypt.genSalt(10);
    
    user.password = await bcrypt.hash(user.password,salt);
    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token',token).send(_.pick(user,['name','email']));
})

module.exports = router;