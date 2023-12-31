import express from "express";

import { loginHandler, registerHandler } from "../controllers/user.js";

const router = express.Router();

router.post("/register", registerHandler);
router.post("/login", loginHandler);

export default router;
