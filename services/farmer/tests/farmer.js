const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

chai.should();
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYzkxNzEzNjIwZjIzMzg0Y2M4MTQ0ZiIsImVtYWlsIjoic2F0eWFtQHRlc3QuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjA4NTUyNzc2LCJleHAiOjE2MDg1NTYzNzZ9.BlfvWyVC12JtYKuhMgaVqlWUbgg-I5otjDUp1f27QOs"
chai.use(chaiHttp);

describe('Farmers API',() =>{
    describe('GET /farmer', ()=>{
    
        it('It should get all the farmers information', (done) => {
            chai.request(server)
                .get('/farmer')
                .set({"Authorization":`Bearer ${token}`})
                .end((err, response) => {
                    response.should.have.status(203);
                    response.body.should.be.a('array');
                    response.body.length.should.be.gte(0);
                })
                done();
        })
        it('It should not return all the farmers information', (done) => {
            chai.request(server)
                .get('/farmers')
                .set({"Authorization":`Bearer ${token}`})
                .end((err, response) => {
                    response.should.have.status(404);
                })
                done();
        })
    })

    describe('GET /farmer/profile/:id', ()=>{
        let id = '5fc91a241a1c386e54f63421'
        it('It should get profile of a single user', (done) => {
            chai.request(server)
                .get('/farmer/profile/'+id)
                .set({"Authorization":`Bearer ${token}`})
                .end((err, response) => {
                    response.should.have.status(201);
                    response.body.should.be.a('Object');
                    response.body.should.have.property("name").eq("Shaun");
                    response.body.should.have.property("email");
                    response.body.should.have.property("phone");
                    response.body.should.have.property("description");
                    response.body.bank_details.should.be.a('Object');
                    response.body.should.have.property("role");
                })
                done();
        })

        it('It should return not found', (done) => {
            chai.request(server)
                .get('/farmer/profile/5fd910a0438be938543db654') //invalid id
                .set({"Authorization":`Bearer ${token}`})
                .end((err, response) => {
                    response.should.have.status(404);
                    response.text.should.be.eq('{"error":"Cannot find profile with that ID"}')
                })
                done();
        })
    })

    describe('POST /farmer/signup',() => {
        xit('It should register farmer and save data to DB', (done) => {
            const farmer = {
                "name": "John",
                "email": "john@test.com",
                "phone": 9983721134,
                "password": "john123",
                "description": "Hello, I'm John"
            }
            chai.request(server)
                .post('/farmer/signup')
                .send(farmer)
                .set({"Authorization":`Bearer ${token}`})
                .end((err, response) => {
                    response.should.have.status(201);
                    response.should.be.a('object')
                })
            done();
        })
        it('It should not register farmer with same email ID', (done) => {
            const farmer = {
                "name": "Shaun",
                "email": "shaun@test.com",
                "phone": 9983721134,
                "password": "shaun123",
                "description": "Hello, I'm Shaun"
            }
            chai.request(server)
                .post('/farmer/signup')
                .send(farmer)
                .set({"Authorization":`Bearer ${token}`})
                .end((err, response) => {
                    response.should.have.status(422);
                })
            done();
        })
    })

    describe('POST /farmer/login',() => {
        it('It should login farmer', (done) => {
            const farmer = {
                "email": "shaun@test.com",
                "password": "shaun123"
            }
            chai.request(server)
                .post('/farmer/login')
                .send(farmer)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.should.be.a('object')
                    response.body.should.have.property("message");
                    response.body.should.have.property("token");
                    response.body.should.have.property("id");
                    response.body.should.have.property("email");
                    response.body.should.have.property("role");
                })
            done();
        })
        it('It should not login farmer', (done) => {
            const farmer = {
                "email": "john@test.com",
                "password": "john432"
            }
            chai.request(server)
                .post('/farmer/login')
                .send(farmer)
                .end((err, response) => {
                    response.should.have.status(401);
                })
            done();
        })
    })

    describe('PUT /farmer/:id',() => {
        it('It should update farmer profile', (done) => {
            let id = '5fdb2f8b95ff1b336ca889f3'
            const farmer = {
              "description":"I'm Roman Kane"
            }
            chai.request(server)
                .put('/farmer/'+id)
                .send(farmer)
                .set({"Authorization":`Bearer ${token}`})
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.have.property('message').eq("Update Successful")
                })
            done();
        })
    })
})
