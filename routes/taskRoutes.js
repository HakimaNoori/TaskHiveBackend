import express from "express";
import {
  createTask,
  getTasks,
  getTaskSummary,
  getTasksByDay,
  getTasksByStatus,
  updateTask,
  deleteTask,
} from "../controller/taskController.js";
import { protect } from "../middleware/userMiddleware.js";
import checkTaskOwnership from "../middleware/taskMiddleware.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getTasks).post(createTask);

router.get("/summary", getTaskSummary);
router.get("/by-day", getTasksByDay);
router.get("/by-status", getTasksByStatus);

router
  .route("/:id")
  .put(checkTaskOwnership, updateTask)
  .delete(checkTaskOwnership, deleteTask);

export default router;
