const Division = require('../../models/division');

module.exports = (req, res) => {
	if(req.body.name) {
		Division.findOne({ name: req.body.name }, (err, data) => {
			if (err) {
				console.error(err);
				res.status(500).json({ success: false, message: 'Error fetching data' });
			} else if (!data) {
				res.status(200).json({ success: true, message: 'User does not exist' });
			} else {
				res.status(200).json({ success: true, data });
			}
		});
	} else {
		res.status(400).json({ success: false, message: 'Invalid parameters' });
	}
};