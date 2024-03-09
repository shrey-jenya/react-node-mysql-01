const express = require("express");
const db = require("./db");

const router = express.Router();

router.delete("/:id", (req, res) => {
    const taskId = req.params.id;
    db.query("DELETE FROM tasks WHERE id = ?", taskId, (err, result) => {
        if (err) {
            console.error("Error deleting task:", err);
            return res.status(500).json({ error: "An error occurred while deleting the task" });
        }
        res.send("Task deleted successfully");
    });
});

module.exports = router;
