const Person = require('../../models/person');
const passwordValidator = require('../../utils/passwordGenerator').validate;
const tokenGenerator = require('../../utils/tokenGenerator');

module.exports = (req, res) => {
	if (req.body.email && req.body.email.length > 0 && req.body.password && req.body.password.length > 0) {
		Person.findOne({ email: req.body.email }, { _id:1, password:1 }, (err, data) => {
			if (err) {
				console.error(err);
				res.status(400).json(responseMessage.FAIL.SOMETHING_WRONG);
			} else {
				if (data) {
					if (passwordValidator(data.password, req.body.password)) {
						console.log(data);
						let messageToSend = responseMessage.SUCCESS.LOGIN;
						messageToSend.token = tokenGenerator(data._id.toString());
						res.status(200).json(messageToSend);
					} else {
						res.status(400).json(responseMessage.FAIL.INVALID_CRED);
					}
				} else {
					res.status(400).json(responseMessage.FAIL.USER.NOT_EXISTS);
				}
			}
		});
	} else {
		res.status(400).json(responseMessage.FAIL.INC_INV_DATA);
	}
};