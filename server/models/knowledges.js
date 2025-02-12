const mongoose = require("mongoose");

// knowledge model
const KnowkedgeSchema = new mongoose.Schema({
    title: {type: String, require: true, unique: true},
    image: {type: String},
    content: {type: String},
}, { timestamps: true });

module.exports = mongoose.model("Knowledge", KnowkedgeSchema)