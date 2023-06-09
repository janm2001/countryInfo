const mongoose = require('mongoose');



const cityShema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    population:{
        type:Number,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model("City",cityShema);