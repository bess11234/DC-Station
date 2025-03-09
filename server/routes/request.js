const express = require('express');

const Request = require("../models/requests");
const { isAwaitExpression } = require('typescript');
const { isMarkedAsUntransferable } = require('worker_threads');
const { any } = require('zod');

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


router.put("/:id", async (req, res) => {
    try {
        const request = await Request.findById(req.params.id);
        //not found
        if (!request) {
            return res.status(404).json({ status: "error", message: "Adopter's Request not found" });
        }

        //found
        const updateData = req.body; // Only update the fields that are provided
        const updatedRequest = await Request.findByIdAndUpdate(
            req.params.id,
            { $set: req.body }, // Use $set to update only specified fields
            { new: true, runValidators: true } // Return updated document & validate
        );

        res.status(201).json({ status: "ok", message: updatedRequest });
    } catch (error) {
        res.status(201).json({ status: "error", message: error.message });
    }
});

router.put("/reject/:id", async (req, res) => {
    try {
        const updatedRequest = await Request.updateMany({ id: {$ne: req.params.id }},{ $set: { status : "rejected"}}, { new: true, runValidators: true });

        res.status(201).json({ status: "ok", message: updatedRequest });
    } catch (error) {
        res.status(201).json({ status: "error", message: error.message });
    }
})

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
        const request = await Request.find({ status: { $ne: "Pending" }, animal: animalId }).sort({ createdAt: 'desc' }).skip(req.query.skip).limit(req.query.limit);
        
        res.status(200).json({ status: "ok", message: request })
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message })
    }
})

module.exports = router