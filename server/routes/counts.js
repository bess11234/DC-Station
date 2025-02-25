const express = require('express');

const Animal = require("../models/animals");
const Knowledge = require("../models/knowledges")
const Request = require("../models/requests")

const router = express.Router();

router.get("/animals", async (req, res) => {
    const animal = await Animal.countDocuments()
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

module.exports = router;