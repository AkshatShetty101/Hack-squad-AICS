const SysAdmin = require('../../models/system_admin');
const passwordValidator = require('../../utils/passwordGenerator').validate;
const tokenGenerator = require('../../utils/tokenGenerator');

module.exports = (req, res) => {
	if (req.body.username && req.body.username.length > 0 && req.body.password && req.body.password.length > 0) {
		SysAdmin.findOne({ username: req.body.username }, (err, data) => {
			if (err) {
				console.error(err);
				res.status(400).json(responseMessage.FAIL.SOMETHING_WRONG);
			} else if (!data) {
				res.status(400).json(responseMessage.FAIL.USER.NOT_EXISTS);
			} else {
				if(passwordValidator(data.password, req.body.password)) {
					let messageToSend = responseMessage.SUCCESS.LOGIN;
					messageToSend.token = tokenGenerator(data._id.toString());
					res.status(200).json(messageToSend);
				} else {
					res.status(400).json(responseMessage.FAIL.INVALID_CRED);
				}
			}
		});
	} else {
		res.status(400).json(responseMessage.FAIL.INC_INV_DATA);
	}
};