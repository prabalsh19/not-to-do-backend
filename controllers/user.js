import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginHandler = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user)
    return res
      .status(404)
      .json({ success: false, message: "User doesn't exist" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    const token = jwt.sign({ _id: user._id }, "sdads");
    res.status(200).cookie("token", token).json({
      success: "true",
      message: "Loggedin Successfully",
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Password does not match",
    });
  }
};

export const registerHandler = async (req, res) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) return res.json({ success: false, message: "User Already Exist" });

  const hashedPassword = await bcrypt.hash(password, 10);

  User.create({ email, name, password: hashedPassword });
  res.json({
    success: true,
    message: "User created",
  });
};
