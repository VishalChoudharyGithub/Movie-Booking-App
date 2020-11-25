//imports
const express = require("express");
const {Customer,validate} = require("../models/customer")

//router
const router = express.Router();

//routes
router.get("/", async(req,res) => {
    const customers = await Customer.find().sort({name:1}).select({__v:0})
    console.log(customers);
    res.send(customers);
})

router.post("/",async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    let customer = new Customer(req.body)
    customer= await customer.save()
    console.log(customer);
    res.send(customer);
})
router.get("/:id",async(req,res)=>{
   const customer =  await Customer.findById(req.params.id)
   if(!customer) return res.status(404).send("No customer with this id");
   res.send(customer)
   console.log(customer);
})

router.delete("/",async(req,res)=>{
    const result = await Customer.remove()
    res.send(result);
})
router.delete("/:id",async(req,res)=>{
    const customer = await Customer.findByIdAndRemove(req.params.id)
    if(!customer) return res.status(404).send("No customer detected ");
    res.send(customer);
})

router.put("/:id",async(req,res)=>{

    const {error} = validate(req.body) ;
    if(error) return res.send(error.details[0].message);

    const customer =  await Customer.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        phone:req.body.phone
    },{new:true});
    if(!customer) return res.status(404).send("No customer detected...");

    res.send(customer);

})


module.exports = router;