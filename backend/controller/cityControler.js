const City = require('../model/City');
const mongoose = require('mongoose');

//get all cities
const getCities = async (req,res) =>{
    const cities = await City.find({}).sort({createdAt:-1});

    res.status(200).json(cities);


}

//get a single city
const getCity = async (req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such city'});
    }

    const city = await City.findById(id);

    if(!city){
        return res.status(404).json({error:'No such city'});
    }

    res.status(200).json(city);
}

//create a new city
const createCity = async (req,res) => {
    const {name,country,population} = req.body;

    let emptyFields = [];
    if(!name){
        emptyFields.push(name);
    }
    if(!country){
        emptyFields.push(country);
    }
    if(!population){
        emptyFields.push(population);
    }

    if(emptyFields.length > 0){
        return res.status(400).json({error:"Please fill all the fields",emptyFields});
    }

    try{
        const city = await City.create({name,country,population});
        res.status(200).json(city);
    }catch(error){
        res.status(400).json({error:error.message})
    }
}


//delete a city
const deleteCity = async (req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such city'});
    }

    const city = await City.findOneAndDelete({_id:id});

    if(!city){
        return res.status(404).json({error:'No such city'});
    }

    res.status(200).json(city);


}

//update a city
const updateCity = async (req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such city'});
    }

    const city = await City.findOneAndUpdate({_id:id},{
        ...req.body
    });

    if(!city){
        return res.status(404).json({error:'No such city'});
    }

    res.status(200).json(city);



}

module.exports = {
    getCities,
    getCity,
    createCity,
    deleteCity,
    updateCity
}