/*eslint-disable*/
// refer to https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('/GET Main page status and content', () => {

	after(() => {
		process.exit();
	});

	it('should successfully GET /', (done) => {
		chai.request(server)
			.get('/')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('success').eql(true);
				done();
			});
	});
});