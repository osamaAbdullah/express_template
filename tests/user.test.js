import request from 'supertest'
import app from '#root/app'
import { sequelize } from "#db/index";

const user = {
    id: 1,
    name: 'Osama',
    email: 'Osama@gmail.com',
    role: 'normalUser',
}
const user2 = {
    id: 2,
    name: 'OsamaA',
    email: 'OsamaA@gmail.com',
    role: 'admin',
}

describe('test user model', () => {

    beforeAll(async () => {
        await sequelize.sync({ force: true })
    })

    it("creates a user", async () => {
        const res = await request(app).post("/api/v1/users").send(user);
        expect(res.statusCode).toBe(200)
        expect(res.body.name).toMatch(user.name)
    });

    it("get a specific user in db", async () => {
        const res = await request(app).get("/api/v1/users/" + user.id);
        expect(res.statusCode).toBe(200)
        expect(res.body.name).toMatch(user.name)
    });

    it("update a specific user in db", async () => {
        const res = await request(app).put("/api/v1/users/" + user.id).send({ ...user, name: 'updated' });
        expect(res.statusCode).toBe(200)
        expect(res.body.name).toMatch('updated')
    });

    it("get all users in db", async () => {
        await request(app).post("/api/v1/users").send(user2)
        const res = await request(app).get("/api/v1/users");
        expect(res.statusCode).toBe(200)
        expect(res.body.users.length).toEqual(2)
    });

    it("deletes a specific user in db", async () => {
        const res = await request(app).delete("/api/v1/users/" + user.id)
        expect(res.statusCode).toBe(200)

        const res2 = await request(app).get("/api/v1/users");
        expect(res2.statusCode).toBe(200)
        expect(res2.body.users.length).toEqual(1)

        const res3 = await request(app).delete("/api/v1/users/" + user2.id)
        expect(res3.statusCode).toBe(200)

        const res4 = await request(app).get("/api/v1/users");
        expect(res4.statusCode).toBe(200)
        expect(res4.body.users.length).toEqual(0)
    });

    afterAll(async () => {
        await sequelize.close()
    })

});
