const Division = require('../../models/division');

module.exports = (req, res) => {
	// Checking if division is already registered
	if (req.body.name && req.body.name.length > 0 && req.body.type && ['division', 'organisation', 'group'].indexOf(req.body.type) > -1) {
		Division.findOne({ name: req.body.name }, function (err, result) {
			if (err) {
				console.error(err);
				res.status(400).json(responseMessage.FAIL.SOMETHING_WRONG);
			} else if (result) {
				res.status(400).json(responseMessage.FAIL.DIVISION.EXISTS);
			} else {
				// Adding division to DB
				let divisionData = new Division({
					name: req.body.name,
					type: req.body.type
				});
				divisionData.save(function (err) {
					if (err) {
						console.error(err);
						res.status(500).json(responseMessage.FAIL.SOMETHING_WRONG);
					}
					else {
						// Responding with success status
						res.status(200).json(responseMessage.SUCCESS.SUCCESS);
					}
				});
			}
		});
	} else {
		res.status(400).json(responseMessage.FAIL.INC_INV_DATA);
	}
};