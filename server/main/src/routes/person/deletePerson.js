// Declaring constants
const Person = require('../../models/person');

module.exports = (req, res, next) => {
	// Removing based on id of person
	if (req.body.personId) {
		console.log('here!');
		person.findByIdAndRemove(req.body.personId, function (err) {
			if (err) {
				console.error(err);
				res.status(400).json({ success: false, message: 'Invalid Id' });
			} else {
				console.log('here!');
				next();
			}
		});
	} else {
		res.status(400).json({ success: false, message: 'Invalid parameters' });
	}
};