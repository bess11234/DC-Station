const express = require('express');

const Animal = require("../models/animals");

const router = express.Router();

// Add New Animal
router.post("/", async(req, res)  => {
    try{
        const newAnimal = new Animal(req.body);
        await newAnimal.save();
        res.status(201).json({ status: "ok", message: "Add new animal successfully!", animal: newAnimal});
    }catch(error){
        console.log(error);
        res.status(500).json({  status: "error", message: "Server error" });
    }
})

//Get All Animals
router.get("/", async(req, res)  => {
    try{
        const animals = await Animal.find({});
        res.status(200).json(animals);
    } catch(error){
        res.status(500).json({ status: "error", message: error.message });
    }
})

//Get Specific Animal
router.get("/:id", async(req, res)  => {
    console.log(req.params.id)
    try{
        const animal = await Animal.findById({_id: req.params.id});
        
        //not found
        if (!animal){
            return res.status(404).json({ status: "error", message: "Animal not found" });
        }
        //found
        res.status(200).json({ status: "ok", animal });
    } catch(error){
        console.log("error.message", error.message)
        res.status(500).json({ status: "error", message: error.message });
    }
})

//Update Specific Animal
router.put("/:id", async(req, res) => {
    console.log(req.body.name)
    try{
        const animal = await Animal.findById(req.params.id);
        //not found
        if (!animal){
            return res.status(404).json({ status: "error", message: "Animal not found" });
        }
        //found
        const updateAnimal = await Animal.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(201).json({ status: "ok", updateAnimal});
    }catch(error){
        res.status(500).json({ status: "error", message: error.message });
    }
})

//Delete Specific Animal
router.delete("/:id" , async(req, res) => {
    try{
        const animal = await Animal.findById(req.params.id);
        //not found
        if (!animal){
            return res.status(404).json({ status: "error", message: "Animal not found" });
        }
        //found
        await Animal.findByIdAndDelete(req.params.id);
        
        res.status(204).json({ status: "ok", message: "Delete animal successfully!"})
    }catch(error){
        res.status(500).json({ status: "error", message: error.message });
    }
})

module.exports = router;