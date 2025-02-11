const mongoose = require(mongoose);

const knowkedgeSchema = new mongoose.Schema({
    title: {type: String, require: true},
    content: {type: String}
})

module.exports = mongoose.model("Knowledge", knowkedgeSchema)