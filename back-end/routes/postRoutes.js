import express from "express";

import {
  getAllPost,
  createPost,
  updatePost,
  getPostById,
  deletePost,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/all-post", getAllPost);

router.post("/create-post", createPost);

router.put("/update-post/:id", updatePost);

router.get("/get-post/:id", getPostById);

router.delete("/delete-post/:id", deletePost);

export default router;
