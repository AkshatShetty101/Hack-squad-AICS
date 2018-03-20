const Division = require('../../models/division');

module.exports = (req, res) => {
	// Checking if division is already registered
	if (req.body.name && req.body.name.length > 0 && req.body.type && ['division', 'organization', 'group'].indexOf(req.body.type) > -1) {
		Division.findOne({ name: req.body.name }, function (err, result) {
			if (err) {
				console.error(err);
				res.status(400).json({ success: false, message: 'Invalid name' });
			} else if (result) {
				res.status(400).json({ success: false, message: 'Division/Group/Organization already exists' });
			} else {
				// Adding division to DB
				let divisionData = new Division({
					name: req.body.name,
					type: req.body.type
				});
				divisionData.save(function (err) {
					if (err) {
						console.error(err);
						res.status(500).json({ success: false, message: 'Error saving division' });
					}
					else {
						// Responding with success status
						res.status(200).json({ successs: true, message: 'Added Division/Group/Organization successfully' });
					}
				});
			}
		});
	} else {
		res.status(400).json({ success: false, message: 'Invalid parameters' });
	}
};