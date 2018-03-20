const jwt = require('jsonwebtoken');
const jwtSecretKey = require('../../config/jwtSecretKey');
const User = require('../models/person');
const ReqAuth = require('../models/requesting_authority');
const SysAdmin = require('../models/system_admin');

module.exports = exports = {};

exports.verifyPerson = (req, res, next) => {
	// check header or url parameters or post parameters for token
	const token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token) {
		jwt.verify(token, jwtSecretKey, (err, decoded) => {
			if (err || !decoded) { //decoded undefined means key is wrong
				console.error(err);
				res.status(500).json({ success: false, message: 'Error decoding token' });
			}
			else {
				// Get user data and save it for use in other routes
				User.findOne({ _id: decoded.data }, (err, data) => {
					if (data) {
						res.locals.user = data;
						next();
					} else {
						res.status(400).json({ success: false, message: 'User does not exist' });
					}
				});
			}
		});
	} else {
		// if there is no token return error
		res.status(401).json({ success: false, message: 'No Token Provided!' });
	}
};

exports.verifyAdmin = (req, res, next) => {
	if (res.locals.user.designation === 'admin') {
		next(); // token is verified and is Admin
	}
	else {
		res.status(400).json({ success: false, message: 'Not an Admin' });
	}
};

exports.verifyGC = (req, res, next) => {
	if (res.locals.user.designation === 'gc') {
		next(); // token is verified and is GC
	} else {
		res.status(400).json({ success: false, message: 'Not a GC' });
	}
};

exports.verifyRequestingAuthority = (req, res, next) => {
	// check header or url parameters or post parameters for token
	const token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token) {
		jwt.verify(token, jwtSecretKey, (err, decoded) => {
			if (err || !decoded) { //decoded undefined means key is wrong
				console.error(err);
				res.status(500).json({ success: false, message: 'Error decoding token' });
			}
			else {
				// Get user data and save it for use in other routes
				ReqAuth.findOne({ _id: decoded.data }, (err, data) => {
					if (data) {
						res.locals.user = data;
						next();
					} else {
						res.status(400).json({ success: false, message: 'User does not exist' });
					}
				});
			}
		});
	} else {
		// if there is no token return error
		res.status(401).json({ success: false, message: 'No Token Provided!' });
	}
};

exports.verifySystemAdmin = (req, res, next) => {
	const token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token) {
		jwt.verify(token, jwtSecretKey, (err, decoded) => {
			if (err || !decoded) { //decoded undefined means key is wrong
				console.error(err);
				res.status(500).json({ success: false, message: 'Error decoding token' });
			}
			else {
				// Get user data and save it for use in other routes
				SysAdmin.findOne({ _id: decoded.data }, (err, data) => {
					if (data) {
						res.locals.user = data;
						next();
					} else {
						res.status(400).json({ success: false, message: 'User does not exist' });
					}
				});
			}
		});
	} else {
		// if there is no token return error
		res.status(401).json({ success: false, message: 'No Token Provided!' });
	}
};