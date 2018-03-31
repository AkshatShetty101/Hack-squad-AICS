const jwt = require('jsonwebtoken');
const jwtSecretKey = require('../../config/jwtSecretKey');
const User = require('../models/person');
const ReqAuth = require('../models/requesting_authority').default;
const SysAdmin = require('../models/system_admin');

module.exports = exports = {};

exports.verifyPerson = (req, res, next) => {
	console.log('Verifying person!');
	// check header or url parameters or post parameters for token
	const token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token) {
		jwt.verify(token, jwtSecretKey, (err, decoded) => {
			if (err || !decoded) {
				 //decoded undefined means key is wrong
				 console.error(err);
				res.status(500).json(responseMessage.FAIL.INVALID_TOKEN);
			}
			else {
				// Get user data and save it for use in other routes
				User.findOne({ _id: decoded.data }, (err, data) => {
					if (data) {
						res.locals.user = data;
						console.log('Verified person!');
						next();
					} else {
						// If not user, possibly Requesting Authority
						ReqAuth.findOne({ _id: decoded.data },{_id:1}, (err, data) => {
							if (data) {
								console.log(data);
								res.locals.user = { _id:data._id, designation: 'ra' };
								next();
							} else {
								res.status(400).json(responseMessage.FAIL.USER_NOT_EXIST);
							}
						});
					}
				});
			}
		});
	} else {
		// if there is no token return error
		res.status(401).json(responseMessage.FAIL.INVALID_TOKEN);
	}
};

exports.verifyAdmin = (req, res, next) => {
	if (res.locals.user.designation === 'admin') {
		next(); // token is verified and is Admin
	}
	else {
		console.log('\n=================Not Admin====================\n');
		res.status(401).json(responseMessage.FAIL.UNAUTHORISED);
	}
};

exports.verifyGC = (req, res, next) => {
	if (res.locals.user.designation === 'gc') {
		next(); // token is verified and is GC
	} else {
		console.log('\n=================Not GC====================\n');
		res.status(401).json(responseMessage.FAIL.UNAUTHORISED);
	}
};

exports.verifyAdminOrGC = (req, res, next) => {
	if (res.locals.user.designation === 'admin' || res.locals.user.designation === 'gc') {
		next(); // token is verified and is Admin or GC
	} else {
		console.log('\n=================Not Admin Not GC====================\n');
		res.status(401).json(responseMessage.FAIL.UNAUTHORISED);
	}
};

exports.verifyRequestingAuthority = (req, res, next) => {
	if (res.locals.user.designation === 'ra') {
		console.log('Verifying RA!');
		next(); // token is verified and is ra
	} else {
		console.log('\n=================Not RA====================\n');
		res.status(401).json(responseMessage.FAIL.UNAUTHORISED);
	}
};

exports.verifySystemAdmin = (req, res, next) => {
	const token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token) {
		jwt.verify(token, jwtSecretKey, (err, decoded) => {
			if (err || !decoded) { //decoded undefined means key is wrong
				console.error(err);
				res.status(500).json(responseMessage.FAIL.INVALID_TOKEN);
			}
			else {
				// Get user data and save it for use in other routes
				SysAdmin.findOne({ _id: decoded.data }, (err, data) => {
					if (data) {
						res.locals.user = data;
						next();
					} else {
						res.status(400).json(responseMessage.FAIL.USER_NOT_EXIST);
					}
				});
			}
		});
	} else {
		// if there is no token return error
		res.status(401).json(responseMessage.FAIL.INVALID_TOKEN);
	}
};