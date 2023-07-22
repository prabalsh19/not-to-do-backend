import express from "express";
import {
  getAllTaskHandler,
  createTaskHandler,
  deletePostHandler,
  editTaskHandler,
} from "../controllers/task.js";
import { isAuthenticated } from "../middleware/auth.js";
const router = express.Router();

router.get("/tasks", isAuthenticated, getAllTaskHandler);
router.post("/task/add", isAuthenticated, createTaskHandler);
router.delete("/task/remove/:id", deletePostHandler);
router.put("/task/edit/:id", editTaskHandler);
export default router;
