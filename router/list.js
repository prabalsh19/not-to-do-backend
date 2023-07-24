import express from "express";
import {
  getAllTaskHandler,
  createTaskHandler,
  deletePostHandler,
  editTaskHandler,
  searchHandler,
} from "../controllers/task.js";
import { isAuthenticated } from "../middleware/auth.js";
const router = express.Router();

router.get("/tasks", isAuthenticated, getAllTaskHandler);
router.post("/add", isAuthenticated, createTaskHandler);
router.delete("/remove/:id", deletePostHandler);
router.put("/edit/:id", editTaskHandler);
router.get("/search", searchHandler);
export default router;
