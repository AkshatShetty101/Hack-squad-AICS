// Declaring constants
const Person = require('../../models/person');

module.exports = (req, res) => {
	//Finding all people with the same divison as provided
	Person.find({ division_id: req.body.divisionId }, { _id: 1, name: 1, division: 1 }, function (err, data) {
		if (err) {
			console.error(err);
			res.status(500).json({ success: false, message: 'Error fetching data' });
		} else {
			res.status(200).json({ success: true, data });
		}
	});
};