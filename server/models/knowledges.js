const mongoose = require("mongoose");

// knowledge model
const KnowkedgeSchema = new mongoose.Schema({
    title: {type: String, require: true},
    describe: {type: String, require: true},
    image: {type: String, require: true, unique: true},
    content: {type: String, require: true},
}, { timestamps: true });

module.exports = mongoose.model("Knowledge", KnowkedgeSchema)