const ReqAuth = require('../../models/requesting_authority');
const passwordGenerator = require('../../utils/passwordGenerator').hash;

module.exports = (req, res) => {
	if (req.body.email && req.body.email.length > 0 && req.body.password && req.body.password.length > 0) {
		const newReqAuth = new ReqAuth({
			email: req.body.email,
			password: passwordGenerator(req.body.password),
			access_form: []
		});
		newReqAuth.save((err) => {
			if (err) {
				res.status(400).json({ success: false, message: 'Authority already exists' });
			} else {
				res.status(200).json({ success: true, message: 'Authority added successfully' });
			}
		});
	} else {
		res.status(400).json({ success: false, message: 'Invalid parameters' });
	}
};