const express = require('express');

const Animal = require("../models/animals");
const Knowledge = require("../models/knowledges")
const Request = require("../models/requests")

const router = express.Router();

router.get("/animals", async (req, res) => {
    const animal = await Animal.countDocuments()
    res.status(200).json({ status: "ok", message: animal })
})

router.get("/animals/find-house", async (req, res) => {
    const animal = await Animal.find({ adoptionDate: null }).countDocuments()
    res.status(200).json({ status: "ok", message: animal })
})

router.get("/animals/found-house", async (req, res) => {
    const animal = await Animal.find({ adoptionDate: { $ne: null } }).countDocuments()
    res.status(200).json({ status: "ok", message: animal })
})

router.get("/animals/have-request", async (req, res) => {
    const animal = (await Request.distinct("animal")).length
    res.status(200).json({ status: "ok", message: animal })
})

router.get("/knowledges", async (req, res) => {
    const knowledges = await Knowledge.countDocuments()
    res.status(200).json({ status: "ok", message: knowledges })
})

router.get("/requests", async (req, res) => {
    const requests = await Request.countDocuments()
    res.status(200).json({ status: "ok", message: requests })
})

router.get("/requests/animal/:animalId", async (req, res) => {
    let count = null
    const animalId = req.params.animalId
    try {
        count = await Request.find({ animal: animalId }).countDocuments()
    } catch (err) {
        count = 0
    }
    res.status(200).json({ status: "ok", message: count })
})

router.get("/requests/pending", async (req, res) => {
    const requests = await Request.find({ status: "Pending" }).countDocuments()
    res.status(200).json({ status: "ok", message: requests })
})

router.get("/requests/pending/:animalId", async (req, res) => {
    let count = null
    const animalId = req.params.animalId
    try {
        count = await Request.find({ status: "Pending", animal: animalId }).countDocuments()
    } catch (err) {
        count = 0
    }
    res.status(200).json({ status: "ok", message: count })
})

router.get("/requests/responsed/:animalId", async (req, res) => {
    let count = null
    const animalId = req.params.animalId
    try {
        count = await Request.find({ status: { $ne: "Pending" }, animal: animalId }).countDocuments()
    } catch (err) {
        count = 0
    }
    res.status(200).json({ status: "ok", message: count })
})

module.exports = router;