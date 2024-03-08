const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001;
const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "task-manager-app",
});
db.connect((err) => {
	if (err) throw err;
	console.log("Connected to task-manager-app");
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
// Get all tasks
app.get("/tasks", (req, res) => {
	db.query("SELECT * FROM tasks", (err, result) => {
		if (err) throw err;
		res.json(result);
	});
});

// Add new task
app.post("/tasks", (req, res) => {
	const { task } = req.body;
	db.query("INSERT INTO tasks (task) VALUES (?)", [task], (err, result) => {
		if (err) throw err;
		res.send("Task added successfully");
	});
});

// Update task
app.put("/tasks/:id", (req, res) => {
	const taskId = req.params.id;
	const { task } = req.body;
	db.query(
		"UPDATE tasks SET task = ? WHERE id = ?",
		[task, taskId],
		(err, result) => {
			if (err) throw err;
			res.send("Task updated successfully");
		}
	);
});

// Delete task
app.delete("/tasks/:id", (req, res) => {
	const taskId = req.params.id;
	db.query("DELETE FROM tasks WHERE id = ?", taskId, (err, result) => {
		if (err) throw err;
		res.send("Task deleted successfully");
	});
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
