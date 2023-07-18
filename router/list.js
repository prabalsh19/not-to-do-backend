import express from "express";
import { getAllTaskHandler, createTaskHandler } from "../controllers/task.js";
import { isAuthenticated } from "../middleware/auth.js";
const router = express.Router();

router.get("/tasks", isAuthenticated, getAllTaskHandler);

router.post("/task/add", isAuthenticated, createTaskHandler);

export default router;
