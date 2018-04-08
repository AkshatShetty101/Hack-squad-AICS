const ReqAuth = require('../../models/requesting_authority').default;
const passwordGenerator = require('../../utils/passwordGenerator').hash;

module.exports = (req, res) => {
	if (req.body.email && req.body.email.length > 0 && req.body.password && req.body.password.length > 0) {
		const newReqAuth = new ReqAuth({
			email: req.body.email,
			password: passwordGenerator(req.body.password)
		});
		newReqAuth.save((err) => {
			if (err) {
				console.error(err);
				res.status(400).json(responseMessage.FAIL.RA.EXISTS);
			} else {
				res.status(200).json(responseMessage.SUCCESS.SUCCESS);
			}
		});
	} else {
		res.status(400).json(responseMessage.FAIL.INC_INV_DATA);
	}
};