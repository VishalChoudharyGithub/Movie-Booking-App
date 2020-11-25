const Joi = require("joi");
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
   name: { type:String , required:true },
});

const Genre = mongoose.model("genre",genreSchema);

function genrevalidator(genre){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    return schema.validate(genre);
}

exports.validate = genrevalidator;
exports.Genre = Genre;
exports.genreSchema = genreSchema;