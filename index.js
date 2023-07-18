import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";

import userRouter from "./router/user.js";
import listRouter from "./router/list.js";
import cookieParser from "cookie-parser";

const app = express();
config({ path: "config.env" });
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect("mongodb://localhost:27017", {
    dbName: "todo",
  })
  .then((c) => console.log(`Database Connected with ${c.connection.host}`))
  .catch((e) => console.error(e));

app.listen(5000, () => console.log("Server is running at port 5000"));

app.use("/api/user", userRouter);
app.use("/api", listRouter);
