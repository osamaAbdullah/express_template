import * as Post from "@controllers/post.controller";
import * as User from "@controllers/user.controller";
import authRoutes from "@routes/auth";
import express from 'express';

const router = express.Router();

authRoutes(router);

router.get('/users', User.getAll);
router.get('/users/:id', User.get);
router.post('/users', User.store);
router.put('/users/:id', User.update);
router.delete('/users/:id', User.destroy);

router.get('/users/:id/posts', User.getPosts);

router.get('/posts', Post.getAll);
router.get('/posts/:id', Post.get);
router.post('/posts', Post.store);
router.put('/posts/:id', Post.update);
router.delete('/posts/:id', Post.destroy);

export default router;
