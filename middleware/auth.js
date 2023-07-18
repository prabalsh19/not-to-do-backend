import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    res.status(404).json({
      success: false,
      message: "Login First",
    });
  }
  const decodedUser = jwt.verify(token, "sdads");

  req.user = await User.findById(decodedUser._id);
  next();
};
