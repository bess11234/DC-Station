const { Schema } = require("ckeditor5")
const { request } = require("http")
const mongoose = require("mongoose")
const { type } = require("os")

// Define Requester Schema
const requesterSchema = new mongoose.Schema({
    idCard: { type: String, require: true },
    phone: { type: String, require: true },
    fb: { type: String, require: true },
    experience: { type: String, require: true },
    reason: { type: String, require: true },
})

// Define Main Schema
const requestSchema = new mongoose.Schema({
    requester: { type: requesterSchema, required: true},
    animalId : {ref: "Animal"}
})

const knowkedges = new mongoose.Schema({
    title: {type: String, require: true},
    content: {type: String}
})

module.exports = mongoose.model("Request", requestSchema)