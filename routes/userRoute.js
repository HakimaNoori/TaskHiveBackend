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

router.post("/signup", signup);
router.post("/signin", signin);

router.get("/", getAllUsers); 
router.get("/:id", getUserById);
router.put("/:id", updateUser);   
router.delete("/:id", deleteUser); 

export default router;
