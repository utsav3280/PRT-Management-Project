const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ClassSchema = new Schema({
    className: { type: Number, required: true, unique: true},
    studentCount: { type: Number }
})

const Class = mongoose.model("classes", ClassSchema);

module.exports = Class;