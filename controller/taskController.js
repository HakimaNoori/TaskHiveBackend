import Task from "../models/taskModel.js";
import mongoose from "mongoose";


export const createTask = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const filter = { createdBy: req.user.id };
    if (req.query.status) {
      filter.status = req.query.status;
    }
    const tasks = await Task.find(filter).populate("assignedTo", "name email");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getTaskSummary = async (req, res) => {
  const userId = req.user.id;
  const now = new Date();
  try {
    const total = await Task.countDocuments({ createdBy: userId });
    const done = await Task.countDocuments({
      createdBy: userId,
      status: "done",
    });
    const inProgress = await Task.countDocuments({
      createdBy: userId,
      status: "in-progress",
    });
    const overdue = await Task.countDocuments({
      createdBy: userId,
      dueDate: { $lt: now },
      status: { $ne: "done" },
    });

    res.json({ total, done, inProgress, overdue });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getTasksByDay = async (req, res) => {
  const userId = req.user.id;
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  try {
    const result = await Task.aggregate([
      {
        $match: {
          createdBy: new mongoose.Types.ObjectId(userId),
          createdAt: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getTasksByStatus = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await Task.aggregate([
      { $match: { createdBy: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
