const Person = require('../../models/person');
const passwordValidator = require('../../utils/passwordGenerator').validate;
const tokenGenerator = require('../../utils/tokenGenerator');

module.exports = (req, res) => {
	if (req.body.email && req.body.email.length > 0 && req.body.password && req.body.password.length > 0) {
		Person.findOne({ email: req.body.email },{_id:1,password:1}, (err, data) => {
			if (err) {
				console.error(err);
				res.status(500).json({ success: false, message: 'Error fetching division' });
			} else {
				if (data) {
					if (passwordValidator(data.password, req.body.password)) {
						console.log(data);
						res.status(200).json({ success: true, token: tokenGenerator(data._id.toString()) });
					} else {
						res.status(400).json({ success: false, message: 'Credentials do not match' });
					}
				} else {
					res.status(400).json({ success: false, message: 'No such user' });
				}
			}
		});
	} else {
		res.status(400).json({ success: false, message: 'Invalid parameters' });
	}
};