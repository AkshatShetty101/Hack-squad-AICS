const ReqAuth = require('../../models/requesting_authority').default;

module.exports = (req, res) => {
	if (req.body.ra_id) {
		ReqAuth.deleteOne({ _id: req.body.ra_id }, (err, data) => {
			console.log(data);
			if (err) {
				console.error(err);
				res.status(400).json(responseMessage.FAIL.SOMETHING_WRONG);
			} else if (data.n === 0) { // n is the number of records deleted
				res.status(400).json(responseMessage.FAIL.RA.NOT_EXISTS);
			} else {
				res.status(200).json(responseMessage.SUCCESS.SUCCESS);
			}
		});
	} else {
		res.status(400).json(responseMessage.FAIL.INC_INV_DATA);
	}
};