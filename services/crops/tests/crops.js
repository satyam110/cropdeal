const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

chai.should();
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYzkxNzEzNjIwZjIzMzg0Y2M4MTQ0ZiIsImVtYWlsIjoic2F0eWFtQHRlc3QuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjA4NTUyNzc2LCJleHAiOjE2MDg1NTYzNzZ9.BlfvWyVC12JtYKuhMgaVqlWUbgg-I5otjDUp1f27QOs"
chai.use(chaiHttp);

describe('Crops API',() =>{
    describe('GET /crops', ()=>{
    
        it('It should get all the crops', (done) => {
            chai.request(server)
                .get('/crops')
                .set({"Authorization":`Bearer ${token}`})
                .end((err, response) => {
                    response.should.have.status(201);
                    response.body.should.be.a('array');
                    response.body.length.should.be.gte(0);
                })
                done();
        })
        it('It should not return all the crops', (done) => {
            chai.request(server)
                .get('/crop')
                .set({"Authorization":`Bearer ${token}`})
                .end((err, response) => {
                    response.should.have.status(404);
                })
                done();
        })
    })
    
    describe('GET /crops/:id', ()=>{
        
        it('It should get all the crops', (done) => {
            chai.request(server)
                .get('/crops/5fd910a0438be938543db836')
                .set({"Authorization":`Bearer ${token}`})
                .end((err, response) => {
                    response.should.have.status(201);
                    response.body.should.be.a('Object');
                    response.body.should.have.property("name").eq("Carrots");
                    response.body.should.have.property("type");
                    response.body.should.have.property("quantity");
                    response.body.should.have.property("cost");
                    response.body.should.have.property("uploader");
                    response.body.should.have.property("farmerName");
                    response.body.should.have.property("farmerPhone");
                })
                done();
        })

        it('It should return not found', (done) => {
            chai.request(server)
                .get('/crops/5fd910a0438be938543db654') //invalid id
                .set({"Authorization":`Bearer ${token}`})
                .end((err, response) => {
                    response.should.have.status(404);
                    response.text.should.be.eq('{"error":"Cannot fetch entry with that ID"}')
                })
                done();
        })
    })

    describe('POST /crops',() => {
        it('It should NOT POST a new crop details object without image data', (done) => {
            const crop = {
                "name": "Cabbage",
                "type": "Vegetable",
                "quantity": 50,
                "location": "Nagpur",
                "cost": "25",
                "uploader": "5fc91713620f23384cc8144f"
            }
            chai.request(server)
                .post('/crops')
                .send(crop)
                .set({"Authorization":`Bearer ${token}`})
                .end((err, response) => {
                    response.should.have.status(500);
                })
            done();
        })

    })

    describe('PUT /crops/:id',() => {
        it('It should update crop details', (done) => {
            const id = '5fd510c91efd5b3f3c3ea4ef'
            const crop = {
                "quantity": 40,
                "location": "Mumbai",
                "cost": "32"
            }
            chai.request(server)
                .put('/crops/'+id)
                .send(crop)
                .set({"Authorization":`Bearer ${token}`})
                .end((err, response) => {
                    response.should.have.status(201);
                    response.body.should.have.property('_id').eq(id)
                })
            done();
        })

    })

    

    describe('DELETE /crops/:id',() => {
        xit('It should delete an existing crop details', (done) => {
            //5fdb2f498e24355030e39a61
            //5fdb2fd38e24355030e39a62
            //5fdb323f8e24355030e39a66
            const id = '5fdb2f498e24355030e39a61'
            
            chai.request(server)
                .delete('/crops/'+id)
                .set({"Authorization":`Bearer ${token}`})
                .end((err, response) => {
                    response.should.have.status(200);
                })
            done();
        })

        it('It should not delete crop details which does not exist', (done) => {
            //5fdb2f498e24355030e39a61
            //5fdb2fd38e24355030e39a62
            //5fdb323f8e24355030e39a66
            const id = '5fdb2f498e24355030f54e76'
            
            chai.request(server)
                .delete('/crops/'+id)
                .set({"Authorization":`Bearer ${token}`})
                .end((err, response) => {
                    response.should.have.status(404);
                })
            done();
        })

    })
})


