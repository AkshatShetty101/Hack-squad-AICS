const Person = require('../../models/person');

module.exports = (req, res) => {
	//Finding person data with email provided
	if (req.body.email) {
		Person.findOne({ email: req.body.email }, { _id: 1 }, function (err, result) {
			if (err) {
				console.error(err);
				res.status(200).json({ success: false, message: 'Error fetching data' });
			} else if (!result) {
				res.json({ success: true, message: 'No such user!' });
			} else {
				// Returning with _id of person
				res.json({ success: false, data: { id: result._id } });
			}
		});
	} else {
		res.status(400).json({ success: false, message: 'Invalid parameters' });
	}
};