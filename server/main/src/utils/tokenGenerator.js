const jwt = require('jsonwebtoken');
const jwtSecretKey = require('../../config/jwtSecretKey');

module.exports = (data) => {
	return jwt.sign({ data }, jwtSecretKey); // sign and return secretKey
};