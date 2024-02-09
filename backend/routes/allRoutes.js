const express = require("express");
const asyncHandler = require("express-async-handler");

const Todo = require("../db-models/taskModel");

const router = express.Router();

// Method GET, for sending back all tasks(reading)
router.get(
	"/",
	asyncHandler(async (req, res) => {
		const tasks = await Todo.find();
		res.json({ success: true, tasks });
	})
);

// Method POST, for creating a task
router.post(
	"/",
	asyncHandler(async (req, res) => {
		const { title, description } = req.body;
		const newTask = new Todo({
			title,
			description,
			completed: false,
		});
		const savedTask = await newTask.save();
		res.status(201).json({ success: true, task: savedTask });
	})
);

// Method PUT, for updating a task
router.put(
	"/:id",
	asyncHandler(async (req, res) => {
		const { title, description, completed } = req.body;

		const updatedTask = await Todo.findByIdAndUpdate(
			req.params.id,
			{ title, description, completed },
			{ new: true }
		);
		if (!updatedTask) {
			res.status(404).json({ success: false, message: "Task not found" });
		} else {
			res.json({ success: true, task: updatedTask });
		}
	})
);

// Method DELETE, for clearing all Todos
router.delete(
	"/clear",
	asyncHandler(async (req, res) => {
		await Todo.deleteMany({});
		res.json({
			success: true,
			message: `Cleared all todos`,
		});
	})
);

// Method DELETE, for deleting a task
router.delete(
	"/:id",
	asyncHandler(async (req, res) => {
		const deletedTask = await Todo.findByIdAndDelete(req.params.id);
		if (!deletedTask) {
			res.status(404).json({ success: false, message: "Task not found" });
		} else {
			res.json({ success: true, message: "Task deleted successfully" });
		}
	})
);

module.exports = router;
