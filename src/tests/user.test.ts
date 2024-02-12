import app from '@/app';
import { sequelize } from '@db/connect';
import { createUser, createUsers, makeUser } from '@db/factories/user.factory';
import { User } from '@models/user.model';
import request from 'supertest';

const basePath = '/api/v1/users/';

describe('test user model', () => {
    
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });
    
    it('register a user', async () => {
        const user = makeUser();
        user.password = '12345qw6rt';
        user.password_confirmation = '12345qw6rt';
        // noinspection TypeScriptValidateTypes
        await request(app)
            .post('/api/v1/register')
            .send(user)
            .expect(307)
            .expect('Location', '/api/v1/login');
        
        const freshUser = await User.findOne({ where: { email: user.email } });
        expect(freshUser.email).toMatch(user.email);
        expect(await User.count()).toBe(1);
    });
    
    it('get a specific user in db', async () => {
        const user = await createUser();
        // noinspection TypeScriptValidateTypes
        const res = await request(app).get(basePath + user.id);
        expect(res.statusCode).toBe(200);
        expect(res.body.email).toMatch(user.email);
    });
    
    it('update a specific user in db', async () => {
        const user = await createUser();
        const name = 'name updated';
        // noinspection TypeScriptValidateTypes
        const res = await request(app).put(basePath + user.id).send({ ...user, name });
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toMatch(name);
    });
    
    it('get all users in db', async () => {
        await User.destroy({ where: {} });
        const userIds = await createUsers({}, 3);
        // noinspection TypeScriptValidateTypes
        const res = await request(app).get(basePath);
        expect(res.statusCode).toBe(200);
        expect(res.body.users.map(user => user.id)).toEqual(userIds);
    });
    
    it('deletes a specific user in db', async () => {
        await User.destroy({ where: {} });
        const user = await createUser();
        expect(await User.count()).toEqual(1);
        // noinspection TypeScriptValidateTypes
        const res = await request(app).delete(basePath + user.id);
        expect(res.statusCode).toBe(200);
        expect(await User.count()).toEqual(0);
    });
    
    afterAll(async () => {
        await sequelize.close();
    });
    
});
