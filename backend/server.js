	const express = require("express");
	const bodyParser = require("body-parser");
	const cors = require("cors");
	const app = express();
	const port = 3001;
	const db = require("./db");
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
	// Routes
	app.use("/tasks", require("./addTask"));
	app.use("/tasks", require("./delete"));

	app.put("/tasks/:id", (req, res) => {
		const taskId = req.params.id;
		const { task, completed } = req.body;
		const updates = {};
		if (task) updates.task = task;
		if (completed !== undefined) updates.completed = completed;
	
		db.query(
			"UPDATE tasks SET ? WHERE id = ?",
			[updates, taskId],
			(err, result) => {
				if (err) {
					console.error('Error updating task:', err);
					return res.status(500).json({ error: "An error occurred while updating the task" });
				}
				res.send("Task updated successfully");
			}
		);
	});
	
	// // Update task
	// app.put("/tasks/:id", (req, res) => {
	// 	const taskId = req.params.id;
	// 	const { task } = req.body;
	// 	db.query(
	// 		"UPDATE tasks SET task = ? WHERE id = ?",
	// 		[task, taskId],
	// 		(err, result) => {
	// 			if (err) throw err;
	// 			res.send("Task updated successfully");
	// 		}
	// 	);
	// });

	app.listen(port, () => {
		console.log(`Server is running on port ${port}`);
	});