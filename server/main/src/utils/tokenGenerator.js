const jwt = require('jsonwebtoken');
const jwtSecretKey = require('../../config/jwtSecretKey');

module.exports = (user) => {
	return jwt.sign({ user }, jwtSecretKey); // sign and return secretKey
};