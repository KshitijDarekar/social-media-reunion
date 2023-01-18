import express from "express";
const router = express.Router();

import {
  logout,
  registerUser,
  login,
  authenticate,
} from "../controllers/auth.js";

router.post("/login", login);
router.post("/register", registerUser);
router.get("/logout", logout);
router.post("/authenticate", authenticate);

export default router;
