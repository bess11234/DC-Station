const express = require('express');

const Request = require("../models/requests");
const Animal = require("../models/animals");
const { isAwaitExpression } = require('typescript');
const { isMarkedAsUntransferable } = require('worker_threads');
const { any, date } = require('zod');

var ObjectId = require('mongoose').Types.ObjectId;

const router = express.Router();

//Add New Request
router.post("/", async (req, res) => {
    try {
        const newRequest = new Request(req.body);
        await newRequest.save();
        res.status(201).json({ status: "ok", message: "Add new adoption's request successfully!" });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Server error" });
    }
})

//Get All Adopter's Request
router.get("/", async (req, res) => {
    try {
        const request = await Request.find();
        res.status(200).json({ status: "ok", message: request });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
})

//Get specific Adopter's Request
router.get("/:id", async (req, res) => {
    try {
        const request = await Request.findById(req.params.id);

        //not found
        if (!request) {
            return res.status(404).json({ status: "error", message: "Adopter's Request not found" });
        }
        //found
        res.status(200).json({ status: "ok", message: request });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
})

// router.put("/all", async (req, res) => {
//     try {
//         // find
//         const animal = await Animal.updateMany({}, { $set: { adoptionDate : null}})

//         res.status(201).json({ status: "ok", message: animal});
//     } catch (error) {
//         res.status(201).json({ status: "error", message: error.message });
//     }
// });


router.delete("/all", async (req, res) => {
    try {
        // find
        const animal = await Request.deleteMany({})

        res.status(201).json({ status: "ok", message: animal});
    } catch (error) {
        res.status(201).json({ status: "error", message: error.message });
    }
});

router.put("/:id", async (req, res) => {
    console.log("check")
    try {
        // find
        const request = await Request.findById(req.params.id);
        const animal = await Animal.findById(request.animal);

        //not found
        if (!request || !animal) {
            return res.status(404).json({ status: "error", message: "adopter's request or animal not found" });
        }
        console.log(await Request.find({ id: {$ne: req.params.id }}, {animal: request.animal}, { $set: { status : "Rejected"}}, { new: true, runValidators: true }))
        
        //check status if "Accepted" then change another to "Rejected"
        // console.log("checlk2")
        if (req.body.status == "Accepted"){
            // update another request to reject status
            await Request.updateMany({ id: {$ne: req.params.id }, animal: request.animal}, { $set: { status : "Rejected"}});
            
            await Animal.findByIdAndUpdate(request.animal,{$set: {adoptionDate: new Date()}});
        }

        //found
        const updatedRequest = await Request.findByIdAndUpdate(
            req.params.id,
            { $set: req.body }, // Use $set to update only specified fields
            { new: true, runValidators: true } // Return updated document & validate
        );

        res.status(201).json({ status: "ok", message: updatedRequest});
    } catch (error) {
        res.status(201).json({ status: "error", message: error.message });
    }
});



//Delete Specific Request
router.delete("/:id", async (req, res) => {
    try {
        const request = await Request.findById(req.params.id);
        //not found
        if (!request) {
            return res.status(404).json({ status: "error", message: "Adopter's Request not found" });
        }
        //found
        await Request.findByIdAndDelete(req.params.id);
        res.status(204).json({ status: "ok", message: "Delete adopter's request successfully!" })
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});


router.get("/animalId/:animalId", async (req, res) => {
    try {
        const animalId = req.params.animalId
        const request = await Request.find({ animal: animalId })
        
        res.status(200).json({ status: "ok", message: request })
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message })
    }
})

router.get("/pending/animalId/:animalId", async (req, res) => {
    try {
        const animalId = req.params.animalId
        const request = await Request.find({ status: "Pending", animal: animalId }).skip(req.query.skip).limit(req.query.limit);
        
        res.status(200).json({ status: "ok", message: request })
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message })
    }
})

router.get("/responsed/animalId/:animalId", async (req, res) => {
    try {
        const animalId = req.params.animalId
        const request = await Request.find({ status: { $ne: "Pending" }, animal: animalId }).sort({ updatedAt: "desc", createdAt: 'desc' }).skip(req.query.skip).limit(req.query.limit);
        
        res.status(200).json({ status: "ok", message: request })
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message })
    }
})

module.exports = router