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

  await Task.findByIdAndUpdate(id, { task });
  res.json({
    success: true,
    message: "Post edited succesfully",
  });
};

export const searchHandler = async (req, res) => {
  const { searchQuery } = req.query;
  const searchRegex = new RegExp(searchQuery, "i");
  const result = await Task.find({ $or: [{ task: { $regex: searchRegex } }] });

  res.json({
    result,
  });
};
