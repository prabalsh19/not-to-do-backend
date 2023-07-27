import { Task } from "../models/task.js";

export const getAllTaskHandler = async (req, res) => {
  const user = req.user;
  try {
    const tasks = await Task.find({ user: user._id });
    res.status(202).json({
      success: true,
      tasks,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Error while fetching tasks",
    });
  }
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
  try {
    const { id } = req.params;

    await Task.findByIdAndDelete({ _id: id }, { new: true });

    res.json({
      success: true,
      message: "post deleted",
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const editTaskHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { task } = req.body;

    await Task.findByIdAndUpdate(id, { task });
    res.json({
      success: true,
      message: "Post edited succesfully",
    });
  } catch {
    res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const searchHandler = async (req, res) => {
  try {
    const { searchQuery } = req.params;
    const searchRegex = new RegExp(searchQuery, "i");

    const result = await Task.find({
      $or: [{ task: { $regex: searchRegex }, user: req.user._id }],
    });

    res.json({
      result,
    });
  } catch {
    res.json({
      success: true,
      message: "Internal Server Error",
    });
  }
};

export const archiveHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    task.isArchived = !task.isArchived;

    await task.save();

    res.json({
      success: true,
      message: task.isArchived
        ? "Task archived succesfully"
        : "Task unarchived succesfully",
    });
  } catch (e) {
    res.json({
      success: true,
      message: "Internal Server Error",
    });
  }
};
