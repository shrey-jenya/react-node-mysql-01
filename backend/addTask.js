const express = require("express");
const db = require("./db"); // Assuming you have a file for database connection

const router = express.Router();

router.post("/", (req, res) => {
    const { task } = req.body;
    if (!task || task.trim() === "") {
        return res.status(400).json({ error: "task field is required" });
    }
    db.query("INSERT INTO tasks (task) VALUES (?)", [task], (err, result) => {  
        if (err) {
            console.error("Error adding task:", err);
            return res.status(500).json({ error: "An error occurred while adding the task" });
        }
        res.send("Task added successfully");
    });
});

module.exports = router;
