//imports
const express = require("express");
const {Genre,validate} = require("../models/genre");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

//router
const router = express.Router();

//routes
router.get("/", async(req,res) => {
    const genres = await Genre.find().sort({name:1}).select({_v:-1})
    console.log(genres);
    res.send(genres);
})

router.post("/",auth,async(req,res)=>{
    
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    let genre = new Genre({
        
        name:req.body.name,
        
    })
    genre= await genre.save()
    console.log(genre);
    res.send(genre);
})

router.delete("/",[auth,admin],async(req,res)=>{
    const result = await Genre.remove();
    res.send(result);
    console.log(result.deletedCount);
})
router.delete("/:id",async(req,res)=>{
    const genre = await Genre.findByIdAndRemove(id);
    if(!genre) return res.status(404).send("Genre with given id is not found");
    res.send(genre)
    console.log("deleted",genre);
})
router.put("/:id",async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(id,{
        name:req.body.name
    },{new:true});
    if(!genre) return res.status(404).send("Genre with given id not found");
    res.send(genre);
    console.log(genre);

})

module.exports = router;