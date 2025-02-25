const express = require("express");

const Knowledge = require("../models/knowledges");

const router = express.Router();

//Create knowledge
router.post("/", async (req, res) => {
    try {
        // const {title, image, content} = req.body;
        const newKnowledge = new Knowledge(req.body)
        await newKnowledge.save()
        res.status(201).json({ status: "ok", message: "Add new knowledge successfully!", knowledge: newKnowledge });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: "Server error" });
    }
})

//Get all knowledge
router.get("/", async (req, res) => {
    try {
        const knowledges = await Knowledge.find({}).sort({ updatedAt: "desc" }).skip(req.query.skip).limit(req.query.limit);
        res.status(200).json({ status: "ok", message: knowledges });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
})

//Get Specific knowledge
router.get("/:id", async (req, res) => {
    let knowledge
    try {
        knowledge = await Knowledge.findById({ _id: req.params.id });
    } catch (err) {
        knowledge = null
    }
    //not found
    if (!knowledge) {
        return res.status(404).json({ status: "error", message: "Knowledge not found" });
    }
    //found
    res.status(200).json({ status: "ok", message: knowledge });
})

//Update Specific Knowledge
router.put("/:id", async (req, res) => {
    console.log(req.body.name)
    try {
        const knowledge = await Knowledge.findById(req.params.id);
        //not found
        if (!knowledge) {
            return res.status(404).json({ status: "error", message: "Knowledge not found" });
        }
        //found
        const updateKnowledge = await Knowledge.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json({ status: "ok", message: updateKnowledge });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
})

//Delete Specific Knowledge
router.delete("/:id", async (req, res) => {
    try {
        const knowledge = await Knowledge.findById(req.params.id);
        //not found
        if (!knowledge) {
            return res.status(404).json({ status: "error", message: "Knowledge not found" });
        }
        //found
        await Knowledge.findByIdAndDelete({ _id: req.params.id });
        res.status(204).json({ status: "ok", message: "Delete knowledge successfully!" })
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

module.exports = router;