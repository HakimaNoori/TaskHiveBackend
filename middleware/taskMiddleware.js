
import Task from "../models/taskModel.js";

const checkTaskOwnership = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }


    if (task.createdBy.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to access this task" });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export default checkTaskOwnership;
