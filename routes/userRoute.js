import express from "express";
import {
  signup,
  signin,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controller/userController.js";

const router = express.Router();

// ثبت‌نام و ورود
router.post("/signup", signup);
router.post("/signin", signin);

// عملیات CRUD کاربران
router.get("/", getAllUsers); // همه کاربران
router.get("/:id", getUserById); // کاربر خاص
router.put("/:id", updateUser); // ویرایش کاربر
router.delete("/:id", deleteUser); // حذف کاربر

export default router;
