// Declaring constants
const Person = require('../../models/person');

module.exports = (req, res) => {
	//Finding all people with the same type as provided
	if (req.body.designation) {
		Person.find({ designation: req.body.designation }, { _id: 1, name: 1, division: 1 }, function (err, result) {
			if (err) {
				console.error(err);
				res.status(500).json({ success: false, message: 'Error fetching data' });
			} else {
				// Returning with data of people
				res.status(200).json({ success: true, message: result });
			}
		});
	} else {
		res.status(400).json({ success: false, message: 'Invalid parameters' });
	}
};