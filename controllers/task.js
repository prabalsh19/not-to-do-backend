import { Task } from "../models/task.js";

export const getAllTaskHandler = async (req, res) => {
  const user = req.user;

  const tasks = await Task.find({ user: user._id });
  res.status(202).json({
    success: true,
    tasks,
  });
};

export const createTaskHandler = (req, res) => {
  const { task } = req.body;
  const user = req.user;
  Task.create({
    task,
    user,
  });
  res.json({ success: true, message: "Task created" });
};
