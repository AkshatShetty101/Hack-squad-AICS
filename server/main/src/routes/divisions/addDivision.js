// Declaring constants
const division = require('../../models/division');
module.exports = (req, res) => {
	// Checking if division is already registered
	division.findOne({ name: req.body.name }, function (err, result) {
		if (err) {
			res.json({ success: false, message: err });
		} else if (result) {
			res.json({ success: false, message: 'Division/Group/Organization already exists' });
		} else {
			// Adding division to DB
			let divisionData = new division({
				name: req.body.name,
				type: req.body.type
			});
			divisionData.save(function (err) {
				if (err) {
					// Error handling
					res.send({ success: false, message: err });
				}
				else {
					// Responding with success status
					res.send({ successs: true, message: 'Added Division/Group/Organization successfully' });
				}
			});
		}
	});
}