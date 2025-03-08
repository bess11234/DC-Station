const mongoose = require("mongoose")


// Define Requester Schema
const requesterSchema = new mongoose.Schema({
    firstname: { type: String, require: true },
    lastname: { type: String, require: true },
    email: { type: String, require: true },
    phone: { type: String, require: true },
    fb: { type: String, require: true },
    experience: { type: String, require: true },
    reason: { type: String, require: true },
}, { _id: false });

// Define Main Schema
const requestSchema = new mongoose.Schema({
    requester: { type: requesterSchema, required: true},
    status: {type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending"},
    animal : {type: mongoose.Schema.Types.ObjectId, ref: "Animal"},
}, { timestamps: true });

module.exports = mongoose.model("Request", requestSchema)