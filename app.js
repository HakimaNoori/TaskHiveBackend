import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import route from "./routes/userRoute.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected successfully."))
  .catch((err) => console.error("Database connection error:", err));

app.get("/", (req, res) => {
  res.send("Hello from TaskHive!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use("/api/users", route);
