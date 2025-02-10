const express = require('express')
const cors = require("cors")

const Animal = require("../models/animal");

const router = express.Router()

// Add New Animal
router.post("/", async (req, res)  => {
    try{
        const {name, specie, breed, gender, dob, history, personalities, health_histories, image, adoptiondate} = req.body;

        const newAnimal = new Animal({name, specie, breed, gender, dob, history, personalities, health_histories, image, adoptiondate})
        await newAnimal.save()
        res.status(201).json({ status: "ok", message: "Add new animal successfully!", animal: newAnimal});
    }catch(error){
        console.log(error);
        res.status(500).json({  status: "error", message: "Server error" });
    }
})

//Get all Animals
router.get("/", async (req, res)  => {
    try{
        const animals = await Animal.find({});
        res.status(200).json(animals);
    } catch(error){
        res.status(500).json({ status: "error", message: error.message });
    }
})

//Get Specific Animal
router.get("/:id", async (req, res)  => {
    try{
        const animal = await Animal.findOne({id: req.params.id});
        
        // if not found
        if (!animal){
            return res.status(404).json({ status: "error", message: "Animal not found" });
        }
        res.status(200).json({ status: "ok", pet });
    } catch(error){
        res.status(500).json({ status: "error", message: error.message });
    }
})

module.exports = router;