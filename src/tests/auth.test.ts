import app from '@/app';
import { user } from "@controllers/auth/user.controller";
import { sequelize } from '@db/connect';
import { createUser, makeUser } from "@db/factories/user.factory";
import request from 'supertest';


const basePath = '/api/v1/';

describe('test authentication', () => {
    
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });
    
    it('user gets unauthenticated message when trying to access /user', async () => {
        const res = await request(app).get(basePath + 'user').expect(401);
        expect(res.body.message).toMatch('Unauthenticated!');
    });
    
    it('test a successful login', async () => {
        
        const agent = request.agent(app);
        
        const password = 'jhdfsuguwu4yur';
        
        const user = await createUser({ password });
        
        await agent.post(basePath + 'login')
            .send({ email: user.email, password })
            .expect(200);
    });
    
    it('test a unsuccessful login', async () => {
        
        const agent = request.agent(app);
        
        const password = 'jhdfsuguwu4yur';
        
        const user = await createUser({ password });
        
        await agent.post(basePath + 'login')
            .send({ email: user.email, password: password + 'ds' })
            .expect(401);
        
    });
    
    it('getting user back when trying to access /user after successful login', async () => {
        
        const agent = request.agent(app);
        
        const password = 'jhdfsuguwu4yur';
        
        const user = await createUser({ password });
        
        await agent.post(basePath + 'login')
            .send({ email: user.email, password })
            .expect(200);
        
        const res = await agent.get(basePath + 'user').expect(200);
        expect(res.body.user.email).toMatch(user.email);
    });
    
    it('test successful registration', async () => {
        
        const agent = request.agent(app);
        
        const pass = 'jhdfsuguwu4yur';
        
        const { name, email, role } = await makeUser();
        
        const user = { name, email, password: pass, password_confirmation: pass, role };
        
        await agent.post(basePath + 'register')
            .send(user)
            .expect(307)
            .expect('Location', basePath + 'login');
    });
    
    it('test unsuccessful registration', async () => {
        
        const agent = request.agent(app);
        
        const pass = 'jhdfsuguwu4yur';
        
        const { name, role } = await makeUser();
        
        const user = { name, email: 'sds', password: pass, password_confirmation: pass, role };
        
        const res = await agent.post(basePath + 'register')
            .send(user)
            .expect(422);
        
        expect(res.body.msg[0].message).toMatch('The email field must be a valid email address')
        
    });
    
    afterAll(async () => {
        await sequelize.close();
    });
    
});
