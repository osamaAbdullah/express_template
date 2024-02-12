import app from '@/app';
import { sequelize } from '@db/connect';
import { createPost, createPosts, makePost } from '@db/factories/post.factory';
import { Post } from '@models/post.model';
import request from "supertest";

const basePath = '/api/v1/posts/';
const Http = request.agent(app);

describe('test post model', () => {
    
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });
    
    it('creates a post', async () => {
        const post = await makePost();
        const res = await Http.post(basePath).send(post);
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toMatch(post.title);
    });
    
    it('get a specific post in db', async () => {
        const post = await createPost();
        const res = await Http.get(basePath + post.id);
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toMatch(post.title);
    });
    
    it('update a specific post in db', async () => {
        const post = await createPost();
        const title = 'new title';
        const res = await Http.put(basePath + post.id).send({ ...post, title });
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toMatch(title);
    });
    
    it('get a specific post in db', async () => {
        const post = await createPost();
        const res = await Http.get(basePath + post.id);
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toMatch(post.title);
    });
    
    it('update a specific post in db', async () => {
        const post = await createPost();
        const title = 'updates title';
        const res = await Http.put(basePath + post.id).send({ ...post, title });
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toMatch(title);
    });
    
    it('get all post in db', async () => {
        await Post.destroy({ where: {} });
        const postIds = await createPosts({}, 3);
        const res = await Http.get(basePath);
        expect(res.statusCode).toBe(200);
        expect(res.body.posts.map(post => post.id)).toEqual(postIds);
    });
    
    it('deletes a specific post in db', async () => {
        await Post.destroy({ where: {} });
        const post = await createPost();
        expect(await Post.count()).toEqual(1);
        const res = await Http.delete(basePath + post.id);
        expect(res.statusCode).toBe(200);
        expect(await Post.count()).toEqual(0);
    });
    
    afterAll(async () => {
        await sequelize.close();
    });
    
});
