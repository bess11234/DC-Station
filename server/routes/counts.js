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

router.get("/knowledges", async (req, res) => {
    const animal = await Knowledge.countDocuments()
    res.status(200).json({ status: "ok", message: animal })
})

router.get("/requests", async (req, res) => {
    const animal = await Request.countDocuments()
    res.status(200).json({ status: "ok", message: animal })
})

router.get("/requests/pending", async (req, res) => {
    const animal = await Request.find({ status: "Pending" }).countDocuments()
    res.status(200).json({ status: "ok", message: animal })
})

module.exports = router;