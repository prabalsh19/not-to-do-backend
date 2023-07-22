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

export const deletePostHandler = async (req, res) => {
  const { id } = req.params;

  await Task.findByIdAndDelete({ _id: id }, { new: true });

  res.json({
    success: true,
    message: "post deleted",
  });
};

export const editTaskHandler = async (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  const posts = await Task.findByIdAndUpdate(id, { task });
  res.json({
    posts,
  });
};
