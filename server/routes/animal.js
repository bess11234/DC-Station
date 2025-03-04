const express = require('express');

const Animal = require("../models/animals");
const Request = require("../models/requests")

const mongoose = require('mongoose');

const router = express.Router();

// Add New Animal
router.post("/", async (req, res) => {
    try {
        const newAnimal = new Animal(req.body);
        await newAnimal.save();
        res.status(201).json({ status: "ok", message: "Add new animal successfully!", animal: newAnimal });
    } catch (error) {
        console.error("POST API 'animals/' ERROR:", error.message)
        res.status(500).json({ status: "error", message: "Server error" });
    }
})

// Get All Animals
router.get("/", async (req, res) => {
    try {
        const animals = await Animal.find({}, { knowledges: 0 }).sort({ adoptionDate: "asc", updatedAt: "desc" }).skip(req.query.skip).limit(req.query.limit);
        res.status(200).json({ status: "ok", message: animals });
    } catch (error) {
        console.error("GET API 'animals/' ERROR:", error.message)
        res.status(500).json({ status: "error", message: error.message });
    }
})

// Get Specific Animal
router.get("/id/:id", async (req, res) => {
    let animal
    try {
        const id = new mongoose.Types.ObjectId(req.params.id)
        // animal = await Animal.findById(req.params.id);
        animal = await Animal.aggregate([
            {
                $match: {
                    "_id": id
                }
            },
            {$lookup: {
                from: "knowledges",
                localField: "knowledges",
                foreignField: "_id",
                as: "knowledges"
            }}
        ])
        animal = animal[0]
    } catch (error) {
        console.error("GET API 'animals/id:id' ERROR:", error.message)
        // res.status(500).json({ status: "error", message: error.message });
        // หากไม่เจอจะให้ส่งตัว null มาแทน
        animal = null
    }

    // not found
    if (!animal) {
        return res.status(404).json({ status: "error", message: null });
    }
    // found
    res.status(200).json({ status: "ok", message: animal });
})

// Get all find house Animals
router.get("/find-house", async (req, res) => {
    let animal
    try {
        animal = await Animal.find({ adoptionDate: null }).sort({ createdAt: "desc" }).skip(req.query.skip).limit(req.query.limit);
    } catch (error) {
        console.error("GET API 'animals/find-house' ERROR:", error.message)
        // res.status(500).json({ status: "error", message: error.message });
        // หากไม่เจอจะให้ส่งตัว null มาแทน
        animal = null
    }

    // not found
    if (!animal || !animal.length) {
        return res.status(404).json({ status: "error", message: null });
    }
    // found
    res.status(200).json({ status: "ok", message: animal });
})

// Get all found house Animals
router.get("/found-house", async (req, res) => {
    let animal
    try {
        animal = await Animal.find({ adoptionDate: { $ne: null } }).sort({ adoptionDate: "desc", updatedAt: "desc" }).skip(req.query.skip).limit(req.query.limit);
    } catch (error) {
        console.error("GET API 'animals/found-house' ERROR:", error.message)
        // res.status(500).json({ status: "error", message: error.message });
        // หากไม่เจอจะให้ส่งตัว null มาแทน
        animal = null
    }

    // not found
    if (!animal || !animal.length) {
        return res.status(404).json({ status: "error", message: null });
    }
    // found
    res.status(200).json({ status: "ok", message: animal });
})

// Get all Animals that have requests
router.get("/have-request", async (req, res) => {
    let animal
    try {
        const skip = req.query.skip | 0
        const limit = !!req.query.limit ? Number(req.query.limit) : 99999

        animal = await Request.aggregate([
            {
                $project: {
                    requester: 1, // 1 คือเอาค่ามาใช้
                    animal: 1,
                    status: 1,
                    createdAt: 1,
                    countPending: {
                        $cond: [{ $eq: ["$status", "Pending"] }, 1, 0]
                    },
                    countRejected: {
                        $cond: [{ $eq: ["$status", "Rejected"] }, 1, 0]
                    }
                }
            },
            {
                $lookup: {
                    from: "animals",
                    localField: "animal",
                    foreignField: "_id",
                    as: "animal"
                }
            },
            { "$unwind": "$animal" },
            {
                $group: {
                    _id: "$animal._id", // necessary for group | specify the value you want to group
                    name: {
                        $first: "$animal.name"
                    },
                    images: {
                        $first: "$animal.images"
                    },
                    createdAt: {
                        $first: "$createdAt"
                    },
                    totalPending: {
                        $sum: "$countPending"
                    },
                    totalRejected: {
                        $sum: "$countRejected"
                    }
                }
            },
            {
                $sort: {
                    "createdAt": -1
                }
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            }
        ])
    } catch (error) {
        console.error("GET API 'animals/have-request' ERROR:", error.message)
        // res.status(500).json({ status: "error", message: error.message });
        // หากไม่เจอจะให้ส่งตัว null มาแทน
        animal = null
    }

    // not found
    if (!animal || !animal.length) {
        return res.status(404).json({ status: "error", message: null });
    }
    // found
    res.status(200).json({ status: "ok", message: animal });
})

// Update Specific Animal
router.put("/:id", async (req, res) => {
    try {
        const animal = await Animal.findById(req.params.id);
        // not found
        if (!animal) {
            return res.status(404).json({ status: "error", message: "Animal not found" });
        }
        // found
        const updateAnimal = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json({ status: "ok", message: updateAnimal });
    } catch (error) {
        console.error("PUT API 'animals/id:id' ERROR:", error.message)
        res.status(500).json({ status: "error", message: error.message });
    }
})

// Delete Specific Animal
router.delete("/:id", async (req, res) => {
    try {
        const animal = await Animal.findById(req.params.id);
        // not found
        if (!animal) {
            return res.status(404).json({ status: "error", message: "Animal not found" });
        }
        // found
        await Animal.findByIdAndDelete(req.params.id);

        res.status(204).json({ status: "ok", message: "Delete animal successfully!" })
    } catch (error) {
        console.error("DELETE API 'animals/id:id' ERROR:", error.message)
        res.status(500).json({ status: "error", message: error.message });
    }
})

module.exports = router;