
import express from 'express';
import { postController } from './post.controller';
const router = express.Router();

router.get("/stats", postController.getBlogStats);
router.post("/", postController.createPost);
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getSinglePost);
router.delete("/:id", postController.deletePost);
router.patch("/:id", postController.updatePost);




export const postRouter = router;