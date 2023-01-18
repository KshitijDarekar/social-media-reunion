import express from "express";
import {
  getUserProfile,
  followUser,
  unfollowUser,
} from "../controllers/user.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.get("/user", protect, getUserProfile);

router.post("/follow/:id", protect, followUser);

router.post("/unfollow/:id", protect, unfollowUser);

export default router;
