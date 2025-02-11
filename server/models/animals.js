const mongoose = require("mongoose");

// Define Illness Schema
const IllnessSchema = new mongoose.Schema({
    name: { type: String },
    status: {
        type: String,
        enum: ["กำลังรักษา", "รักษาหายแล้ว", "เรื้อรัง", "เฝ้าระวัง"]
    }
}, { _id: false });

// Define Health History Schema
const HealthHistorySchema = new mongoose.Schema({
    spayingStatus: {
        type: String,
        enum: ["ทำหมันแล้ว", "ยังไม่ทำหมัน"],
        required: true
    },
    illnesses: {
        type: [IllnessSchema],
        default: []
    }
}, { _id: false });

const AnimalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specie: {
        type: String,
        enum: ["Dog", "Cat"],
        required: true
    },
    breed: { type: String, required: true },
    gender: {
        type: String,
        enum: ["M", "F"],
        required: true
    },
    dob: { type: Date, required: true },
    history: { type: String },
    personalities: [{ type: String, required: true }],
    healthHistories: {
        type: HealthHistorySchema,
        required: true,
        default: { spayingStatus: "ยังไม่ทำหมัน", illnesses: [] }
    },
    images: [{ type: String }],
    adoptionDate: { type: Date, default: null },
    knowledgeId : [{ref: "Request"}]
});

module.exports = mongoose.model("Animal", AnimalSchema);
