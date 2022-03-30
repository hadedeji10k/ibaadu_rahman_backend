import { Router } from "express";
const router = Router();
import postController from "../controllers/post.controller";

router.get("/get-all-posts", postController.getAllPosts);
router.get("/get-all-posts-by-page", postController.getAllPostsByPage);
router.get("/get-post-by-slug", postController.getOnePostBySlug);
router.get("/get-post/:id", postController.getOnePostByID);

router.post("/add-post", postController.addPost);
router.put("/update-post", postController.updatePost);
router.delete("/delete-post/:id", postController.deletePost);

export default router;
