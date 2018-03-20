const SysAdmin = require('../../models/system_admin');
const passwordValidator = require('../../utils/passwordGenerator').validate;
const tokenGenerator = require('../../utils/tokenGenerator');

module.exports = (req, res) => {
	if (req.body.username && req.body.username.length > 0 && req.body.password && req.body.password.length > 0) {
		SysAdmin.findOne({ username: req.body.username }, (err, data) => {
			if (err) {
				console.error(err);
				res.status(500).json({ success: false, message: 'Error fetching data' });
			} else if (!data) {
				res.status(400).json({ success: false, message: 'User does not exist' });
			} else {
				if(passwordValidator(data.password, req.body.password)) {
					res.status(200).json({ success: true, token: tokenGenerator(data._id.toString())});
				} else {
					res.status(200).json({ success: false, message: 'Incorrect username or password' });
				}
			}
		});
	} else {
		res.status(400).json({ success: false, message: 'Invalid parameters' });
	}
};