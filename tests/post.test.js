import request from 'supertest';
import app from '#root/app';
import { sequelize } from '#db/index';
import { createPost, makePost } from '#db/factories/post.factory';
import { Post } from '#db/models/post.model';

const basePath = '/api/v1/posts/';

describe('test post model', () => {

    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    it('creates a post', async () => {
        const post = await makePost();
        const res = await request(app).post(basePath).send(post);
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toMatch(post.title);
    });

    it('get a specific post in db', async () => {
        const post = await createPost();
        const res = await request(app).get(basePath + post.id);
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toMatch(post.title);
    });

    it('update a specific post in db', async () => {
        const post = await createPost();
        const title = 'new title';
        const res = await request(app).put(basePath + post.id).send({ ...post, title });
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toMatch(title);
    });

    it('get all post in db', async () => {
        await Post.truncate();
        const postIds = await createPost({}, 3);
        const res = await request(app).get(basePath);
        expect(res.statusCode).toBe(200);
        expect(res.body.posts.map(post => post.id)).toEqual(postIds);
    });

    it('deletes a specific post in db', async () => {
        await Post.truncate();
        const post = await createPost();
        expect(await Post.count()).toEqual(1);
        const res = await request(app).delete(basePath + post.id);
        expect(res.statusCode).toBe(200);
        expect(await Post.count()).toEqual(0);
    });

    afterAll(async () => {
        await sequelize.close();
    });

});
