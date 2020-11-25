const Joi = require("joi");
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
   name: { type:String , required:true },
   phone: { type:String , required:true },
   isGold : { type:Boolean , default:false }
});

const Customer = mongoose.model("customer",customerSchema);

function customervalidator(customer){
    const schema = Joi.object({
        name:Joi.string().min(3).required(),
        phone:Joi.string().min(5).required()
    })
    return schema.validate(customer);
}

exports.validate = customervalidator;
exports.Customer = Customer;

