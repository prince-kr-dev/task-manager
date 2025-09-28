const express = require("express");
const Task = require("../models/tasks.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

const taskRouter = express.Router();

/**
 * 1. Create Task
 * POST /tasks
 */
taskRouter.post("/create", authMiddleware, async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;

    if (!title || !dueDate) {
      return res.status(400).json({ message: "Title and due date are required" });
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      createdBy: req.user.id,
    });

    res.status(201).json({ message: "Task created", task });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/**
 * 2. Task List (NO pagination)
 * GET /tasks
 */
taskRouter.get("/all", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.id }).sort({ dueDate: 1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/**
 * 3. Task Details
 * GET /tasks/:id
 */
taskRouter.get("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, createdBy: req.user.id });
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/**
 * 4. Task Editing
 * PUT /tasks/:id
 */
taskRouter.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      { title, description, dueDate, priority },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task updated", task });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/**
 * 5. Task Deletion
 * DELETE /tasks/:id
 */
taskRouter.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/**
 * 6. Task Status Update
 * PATCH /tasks/:id/status
 */
taskRouter.patch("/:id/status", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      { status },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task status updated", task });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = taskRouter;
