import express from "express";
import { protect } from "../middlewares/auth.js";
import {
  createPost,
  deletePost,
  likePost,
  unlikePost,
  getAllPosts,
  getPostById,
  makeComment,
} from "../controllers/post.js";

const router = express.Router();

router.post("/posts", protect, createPost);

router.delete("/posts/:id", protect, deletePost);

router.post("/like/:id", protect, likePost);

router.post("/unlike/:id", protect, unlikePost);

router.post("/comment/:id", protect, makeComment);

router.get("/posts/:id", protect, getPostById);

router.get("/all_posts", protect, getAllPosts);

export default router;
