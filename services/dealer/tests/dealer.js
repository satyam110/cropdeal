const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

chai.should();
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYzkxNzEzNjIwZjIzMzg0Y2M4MTQ0ZiIsImVtYWlsIjoic2F0eWFtQHRlc3QuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjA4NTUyNzc2LCJleHAiOjE2MDg1NTYzNzZ9.BlfvWyVC12JtYKuhMgaVqlWUbgg-I5otjDUp1f27QOs"
chai.use(chaiHttp);

describe('Dealers API',() =>{
    describe('GET /dealer', ()=>{
    
        it('It should get all the dealers information', (done) => {
            chai.request(server)
                .get('/dealer')
                .set({"Authorization":`Bearer ${token}`})
                .end((err, response) => {
                    response.should.have.status(203);
                    response.body.should.be.a('array');
                    response.body.length.should.be.gte(0);
                })
                done();
        })
        it('It should not return all the dealers information', (done) => {
            chai.request(server)
                .get('/dealers')
                .set({"Authorization":`Bearer ${token}`})
                .end((err, response) => {
                    response.should.have.status(404);
                })
                done();
        })
    })

    describe('GET /dealer/profile/:id', ()=>{
        let id = '5fc9195e542a895e74ecd68f'
        it('It should get profile of a single user', (done) => {
            chai.request(server)
                .get('/dealer/profile/'+id)
                .set({"Authorization":`Bearer ${token}`})
                .end((err, response) => {
                    response.should.have.status(201);
                    response.body.should.be.a('Object');
                    response.body.should.have.property("name").eq("James");
                    response.body.should.have.property("email");
                    response.body.should.have.property("phone");
                    response.body.should.have.property("description");
                    response.body.bank_details.should.be.a('Object');
                    response.body.payment_details.should.be.a('Object');
                    response.body.should.have.property("role");
                })
                done();
        })

        it('It should return not found', (done) => {
            chai.request(server)
                .get('/dealer/profile/5fd910a0438be938543db654') //invalid id
                .set({"Authorization":`Bearer ${token}`})
                .end((err, response) => {
                    response.should.have.status(404);
                    response.text.should.be.eq('{"error":"Cannot find profile with that ID"}')
                })
                done();
        })
    })

    describe('POST /dealer/signup',() => {
        xit('It should register dealer and save data to DB', (done) => {
            const dealer = {
                "name": "Satyam",
                "email": "satyam@test.com",
                "phone": 9983721134,
                "password": "satyam123",
                "description": "Hello, I'm Satyam"
            }
            chai.request(server)
                .post('/dealer/signup')
                .send(dealer)
                .set({"Authorization":`Bearer ${token}`})
                .end((err, response) => {
                    response.should.have.status(201);
                    response.should.be.a('object')
                })
            done();
        })
        it('It should not register dealer with same email ID', (done) => {
            const dealer = {
                "name": "James",
                "email": "james@test.com",
                "phone": 9983721134,
                "password": "james123",
                "description": "Hello, I'm James"
            }
            chai.request(server)
                .post('/dealer/signup')
                .send(dealer)
                .set({"Authorization":`Bearer ${token}`})
                .end((err, response) => {
                    response.should.have.status(422);
                })
            done();
        })
    })

    describe('POST /dealer/login',() => {
        it('It should login dealer', (done) => {
            const dealer = {
                "email": "james@test.com",
                "password": "james123"
            }
            chai.request(server)
                .post('/dealer/login')
                .send(dealer)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.should.be.a('object')
                    response.body.should.have.property("message");
                    response.body.should.have.property("token");
                    response.body.should.have.property("id");
                    response.body.should.have.property("email");
                    response.body.should.have.property("role").eq("dealer");
                })
            done();
        })
        it('It should not login dealer', (done) => {
            const dealer = {
                "email": "john@test.com",
                "password": "john432"
            }
            chai.request(server)
                .post('/dealer/login')
                .send(dealer)
                .end((err, response) => {
                    response.should.have.status(401);
                })
            done();
        })
    })

    describe('PUT /dealer/:id',() => {
        it('It should update dealer profile', (done) => {
            let id = '5fc9195e542a895e74ecd68f'
            const dealer = {
                "phone": 9983721134,
                "description": "Hello, I'm James"
            }
            chai.request(server)
                .put('/dealer/'+id)
                .send(dealer)
                .set({"Authorization":`Bearer ${token}`})
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.have.property('message').eq("Update Successful")
                })
            done();
        })
    })
})
