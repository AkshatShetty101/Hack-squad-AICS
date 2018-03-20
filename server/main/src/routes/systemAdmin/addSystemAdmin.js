const SysAdmin = require('../../models/system_admin');
const passwordGenerator = require('../../utils/passwordGenerator').hash;

module.exports = (req, res) => {
	if (req.body.username && req.body.username.length > 0 && req.body.password && req.body.password.length > 0) {
		const newAdmin = new SysAdmin({
			username: req.body.username,
			password: passwordGenerator(req.body.password)
		});
		newAdmin.save((err) => {
			if (err) {
				console.error(err);
				res.status(500).json({ success: false, message: 'Error saving data' });
			} else {
				res.status(200).json({ success: true, message: 'Add System Admin Successful' });
			}
		});
	} else {
		res.status(400).json({ success: false, message: 'Invalid parameters' });
	}
};