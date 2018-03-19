/*eslint-disable*/
// refer to https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('/POST tesing add form functionality', () => {
	
	after(() => {
		process.exit();
	});
	
	it('should successfully addForm POST /addForm', (done) => {
		
		const testInput = {
			"personId":"1234",
			"formId":"123w3",
			"metadata":{"stuff":"test"}
		};
		
		chai.request(server)
			.post('/addForm')
			.send(testInput)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('message');
				res.body.should.have.property('success').eql(true);
				done();
			});
	});
});