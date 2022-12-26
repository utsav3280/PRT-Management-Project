const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name: { type: String, required: true },
    classId: { type: String }
})

const Student = mongoose.model("students", StudentSchema);

module.exports = Student;