import express from "express";
const router = express.Router();

import { getUserByID } from "../controllers/user.js";
import {
  logout,
  registerUser,
  login,
  authenticate,
} from "../controllers/auth.js";
import { protect } from "../middlewares/auth.js";
import User from "../models/userModel.js";

router.post("/login", login);
router.post("/register", registerUser);
router.get("/logout", logout);
router.post("/authenticate", authenticate);
