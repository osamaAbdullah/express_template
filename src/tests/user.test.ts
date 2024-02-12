import app from '@/app';
import { sequelize } from '@db/connect';
import { createUser, createUsers, makeUser } from '@db/factories/user.factory';
import { User } from '@models/user.model';
import request from 'supertest';

const basePath = '/api/v1/users/';

const Http = request.agent(app);

describe('test user model', () => {
    
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });
    
    it('register a user', async () => {
    
        const pass = 'jhdfsuguwu4yur';
    
        const { name, email, role } = await makeUser();
    
        const user = { name, email, password: pass, password_confirmation: pass, role };
    
        const res = await Http.post('/api/v1/register').send(user).expect(200);
    
        expect(res.body.user.email).toBe(user.email);
        
    });
    
    it('get a specific user in db', async () => {
        const user = await createUser();
        const res = await Http.get(basePath + user.id);
        expect(res.statusCode).toBe(200);
        expect(res.body.email).toMatch(user.email);
    });
    
    it('update a specific user in db', async () => {
        const user = await createUser();
        const name = 'name updated';
        const res = await Http.put(basePath + user.id).send({ ...user, name });
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toMatch(name);
    });
    
    it('get all users in db', async () => {
        await User.destroy({ where: {} });
        const userIds = await createUsers({}, 3);
        const res = await Http.get(basePath);
        expect(res.statusCode).toBe(200);
        expect(res.body.users.map(user => user.id)).toEqual(userIds);
    });
    
    it('deletes a specific user in db', async () => {
        await User.destroy({ where: {} });
        const user = await createUser();
        expect(await User.count()).toEqual(1);
        const res = await Http.delete(basePath + user.id);
        expect(res.statusCode).toBe(200);
        expect(await User.count()).toEqual(0);
    });
    
    afterAll(async () => {
        await sequelize.close();
    });
    
});
