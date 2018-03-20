const Person = require('../../models/person');
const passwordValidator = require('../../utils/passwordGenerator').validate;
const tokenGenerator = require('../../utils/tokenGenerator');

module.exports = (req, res) => {
	if (req.body.email && req.body.email.length > 0 && req.body.password && req.body.password.length > 0) {
		Person.findOne({ email: req.body.email, password: passwordValidator(req.body.password) }, (err, data) => {
			if (err) {
				console.error(err);
				res.status(500).json({ success: false, message: 'Error fetching division' });
			} else {
				console.log(data);
				res.status(200).json({success: true, token: tokenGenerator()});
			}
		});
	} else {
		res.status(400).json({ success: false, message: 'Invalid parameters' });
	}
};