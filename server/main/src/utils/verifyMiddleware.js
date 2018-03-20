const jwt = require('jsonwebtoken');
const jwtSecretKey = require('../../config/jwtSecretKey');
const User = require('../models/person');
const ReqAuth = require('../models/requesting_authority');
const SysAdmin = require('../models/system_admin');

module.exports = exports = {};

exports.getToken = (user) => {
	return jwt.sign({ user }, jwtSecretKey); // sign and return secretKey
};

exports.verifyPerson = (req, res, next) => {
	// check header or url parameters or post parameters for token
	const token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token) {
		jwt.verify(token, jwtSecretKey, (err, decoded) => {
			if (err || !decoded) { //decoded undefined means key is wrong
				console.error(err);
				res.json({ success: false, message: 'Error decoding token' });
			}
			else {
				// Get user data and save it for use in other routes
				User.findOne({ _id: decoded.user._id }, (err, data) => {
					if (data) {
						res.locals.user = data;
						next();
					} else {
						res.json({ success: false, message: 'User does not exist' });
					}
				});
			}
		});
	} else {
		// if there is no token return error
		res.json({ success: false, message: 'No Token Provided!' });
	}
};

exports.verifyAdmin = (req, res, next) => {
	if (res.locals.user.designation === 'admin') {
		next(); // token is verified and is Admin
	}
	else {
		res.json({ success: false, message: 'Not an Admin' });
	}	
};

exports.verifyGC = (req, res, next) => {
	if (res.locals.user.designation === 'gc') {
		next(); // token is verified and is GC
	} else {
		res.json({ success: false, message: 'Not a GC' });
	}
};

exports.verifyRequestingAuthority = (req, res, next) => {
	// check header or url parameters or post parameters for token
	const token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token) {
		jwt.verify(token, jwtSecretKey, (err, decoded) => {
			if (err || !decoded) { //decoded undefined means key is wrong
				console.error(err);
				res.json({ success: false, message: 'Error decoding token' });
			}
			else {
				// Get user data and save it for use in other routes
				ReqAuth.findOne({ _id: decoded.user._id }, (err, data) => {
					if (data) {
						res.locals.user = data;
						next();
					} else {
						res.json({ success: false, message: 'User does not exist' });
					}
				});
			}
		});
	} else {
		// if there is no token return error
		res.json({ success: false, message: 'No Token Provided!' });
	}
};

exports.verifySystemAdmin = (req, res, next) => {
	const token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token) {
		jwt.verify(token, jwtSecretKey, (err, decoded) => {
			if (err || !decoded) { //decoded undefined means key is wrong
				console.error(err);
				res.json({ success: false, message: 'Error decoding token' });
			}
			else {
				// Get user data and save it for use in other routes
				SysAdmin.findOne({ _id: decoded.user._id }, (err, data) => {
					if (data) {
						res.locals.user = data;
						next();
					} else {
						res.json({ success: false, message: 'User does not exist' });
					}
				});
			}
		});
	} else {
		// if there is no token return error
		res.json({ success: false, message: 'No Token Provided!' });
	}
};

exports.trim_nulls = (data) => {
	let y;
	for (const x in data) {
		y = data[x];
		// console.log("Inside!:" + JSON.stringify(y).charAt(3));
		if (JSON.stringify(y).charAt(2) == '$' && JSON.stringify(y).charAt(9) != '"')
			continue;
		if (y === 'null' || y === null || JSON.stringify(y) == '{"$in":[""]}' || y === '' || typeof y === 'undefined' || (y instanceof Object && Object.keys(y).length == 0)) {
			console.log(data[x]);
			delete data[x];
			console.log(data);
		}
		if (y instanceof Object && JSON.stringify(y).charAt(2) != '$') 
			y = trim_nulls(y);
		console.log(data);
	}
	return data;
};