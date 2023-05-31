const express = require('express');
const router = express.Router();
const {getCity,getCities,createCity,deleteCity,updateCity} = require('../controller/cityControler');

//routes

//GET All cities
router.get('/',getCities);

//GET a single City
router.get("/:id",getCity);

//POST a new City
router.post("/",createCity);

//DELETE a city
router.delete("/:id",deleteCity);

//UPDATE a city
router.patch("/:id",updateCity);

module.exports = router;
