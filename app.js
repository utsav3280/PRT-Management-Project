const mongoose = require("mongoose");
const express = require("express");
const Class = require("./models/classModel");
const Student = require("./models/studentModel");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.connect("mongodb://127.0.0.1:27017/prt3", () => {
    console.log("connected to database");
})

// creating a new class
app.post("/v1/myClass", async (req, res) => {
    try {
        const className = await Class.create(req.body);
        res.status(201).json({
            status: "success",
            classId: className._id
        })
    } catch (error) {
        res.status(404).json({
            status: "Failed",
            message: error.message
        })
    }
})

// adding student to class
app.post("/v1/myClass/:myClassId/students", async (req, res) => {
    try {
        const className = await Class.find({ _id: req.params.myClassId });
        if (className.length !== 0) {
            const student = await Student.create({
                name: req.body.name,
                classId: req.params.myClassId
            });
            res.status(201).json({
                status: "success",
                studentId: student._id
            })
        }
        else {
            res.status(400).json({
                status: "Failed",
                message: "class does not exists"
            })
        }
    } catch (error) {
        res.status(404).json({
            status: "Failed",
            message: error.message
        })
    }
})

// get all classes
app.get("/v1/myClass", async (req, res) => {
    try {
        const classes = await Class.find();
        res.status(200).json({
            status: "success",
            classes
        })
    } catch (error) {
        res.status(404).json({
            status: "Failed",
            message: error.message
        })
    }
})

// get a specific class
app.get("/v1/myClass/:myClassId", async (req, res) => {
    try {
        const className = await Class.findOne({ _id: req.params.myClassId });
        if (className) {
            res.status(200).json({
                status: "success",
                className
            })
        }
        else {
            res.status(404).json({
                status: "Failed",
                error: "There is no class at that id"
            })
        }
    } catch (error) {
        res.status(404).json({
            status: "Failed",
            message: error.message
        })
    }
})

// get students of a particular class
app.get("/v1/myClass/:myClassId/students", async (req, res) => {
    try {
        const students = await Student.find({ classId: req.params.myClassId });
        if (students.length === 0) {
            res.status(404).json({
                error: "There are no students at this class"
            })
        }
        else {
            res.status(200).json({
                students
            })
        }
    } catch (error) {
        res.status(404).json({
            status: "Failed",
            message: error.message
        })
    }
})

// get details of specific student
app.get("/v1/myClass/:myClassId/students/:studentId", async (req, res) => {
    try {
        const student = await Student.find({ classId: req.params.myClassId, _id: req.params.studentId });
        if (student.length === 0) {
            res.status(404).json({
                error: "There is no student of that id"
            })
        }
        else {
            res.status(200).json({
                student
            })
        }
    } catch (error) {
        res.status(404).json({
            status: "Failed",
            message: error.message
        })
    }
})

// update student details
app.put("/v1/myClass/:myClassId/students/:studentId", async (req, res) => {
    try {
        const student = await Student.find({ classId: req.params.myClassId, _id: req.params.studentId });
        console.log(student);
        if (student.length) {
            await Student.updateOne({ _id: req.params.studentId }, { $set: { name: req.body.name } });
            res.status(204).json({ status: "updated" });
        }
        else {
            res.status(404).json({
                error: "There is no student of that id"
            })
        }
    } catch (error) {
        res.status(404).json({
            status: "Failed",
            message: error.message
        })
    }
})

// delete a class
app.delete("/v1/myClass/:myClassId", async (req, res) => {
    try {
        const className = await Class.find({ _id: req.params.myClassId });
        if (className.length !== 0) {
            await Class.deleteOne({ _id: req.params.myClassId });
            res.status(204).json({
                status: "deleted"
            })
        }
        else {
            res.status(404).json({
                error: "There is no class at that id"
            })
        }
    } catch (error) {
        res.status(404).json({
            status: "Failed",
            message: error.message
        })
    }
})

// delete a student
app.delete("/v1/myClass/:myClassId/students/:studentId", async (req, res) => {
    try {
        const student = await Student.find({ classId: req.params.myClassId, _id: req.params.studentId });
        console.log(student);
        if (student.length !== 0) {
            await Student.deleteOne({ _id: req.params.studentId });
            res.status(204).json({ status: "deleted" });
        }
        else {
            res.status(404).json({
                error: "There is no student of that id"
            })
        }
    } catch (error) {
        res.status(404).json({
            status: "Failed",
            message: error.message
        })
    }
})

app.listen("5000", () => { console.log("server is up at 5000 and running"); })