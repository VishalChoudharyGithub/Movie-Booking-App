//imports
const express = require("express");

//router
const router = express.Router();

//routes
router.get("/", (req,res) => {
    res.send("Welcome to vidly app")
})

//export
module.exports = router;