
import passport from "passport";

import { Router } from "express";
import { Post } from "../controller/posts/post.controller";

const router = Router();
const post = new Post();

// only send token in header Authorization with Bearer
router.get('/UserPosts', passport.authenticate("jwt", { session: false }), post.GetPostsByUser);
// only send token in header Authorization with Bearer
router.get('/AllPosts', passport.authenticate("jwt", { session: false }), post.GetAllPost);
// only send token in header Authorization with Bearer and info in body
router.post('/CreatePost', passport.authenticate("jwt", { session: false }), post.CreatePost);
// only send token in header Authorization with Bearer and info in body
router.put('/UpdatePost', passport.authenticate("jwt", { session: false }), post.UpdatePost);
// only send token in header Authorization with Bearer and _id in body
router.delete('/DeletePost', passport.authenticate("jwt", { session: false }), post.DeletePost);

export default router;