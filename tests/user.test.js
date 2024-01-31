import request from 'supertest';
import app from '#root/app';
import { sequelize } from '#db/index';
import { createUser, makeUser } from '#db/factories/user.factory';
import { User } from '#models/user.model';

const basePath = '/api/v1/users/';

describe('test user model', () => {

    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    it('creates a user', async () => {
        const user = await makeUser();
        const res = await request(app).post(basePath).send(user);
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toMatch(user.name);
    });

    it('get a specific user in db', async () => {
        const user = await createUser();
        const res = await request(app).get(basePath + user.id);
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toMatch(user.name);
    });

    it('update a specific user in db', async () => {
        const user = await createUser();
        const name = 'name updated';
        const res = await request(app).put(basePath + user.id).send({ ...user, name });
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toMatch(name);
    });

    it('get all users in db', async () => {
        await sequelize.sync({ force: true });
        const userIds = await createUser({}, 3);
        const res = await request(app).get(basePath);
        expect(res.statusCode).toBe(200);
        expect(res.body.users.map(user => user.id)).toEqual(userIds);
    });

    it('deletes a specific user in db', async () => {
        await sequelize.sync({ force: true });
        const user = await createUser();
        expect(await User.count()).toEqual(1);
        const res = await request(app).delete(basePath + user.id);
        expect(res.statusCode).toBe(200);
        expect(await User.count()).toEqual(0);
    });

    afterAll(async () => {
        await sequelize.close();
    });

});
