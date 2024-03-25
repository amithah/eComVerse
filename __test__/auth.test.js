const request = require('supertest');
const app = require('../app');

describe('Auth',()=>{
    it('should return a 200 status on successful login',async ()=>{
        const resp = await request(app)
        .post("/login")
        .send({email:"test@test.ae"});
        expect(resp.status).toBe(200);
    });
});

describe('Auth',()=>{
    it('should return a 401 status on failed login',async ()=>{
        const resp = await request(app)
        .post("/login")
        .send({email:"test1233@test.ae"});
        expect(resp.status).toBe(401);
    });
});
