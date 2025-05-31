import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"; 
import userRoutes from "./routes/userRoute.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); 

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Server is running. Use /api/users for API.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
