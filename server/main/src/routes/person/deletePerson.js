// Declaring constants
const Person = require('../../models/person');

module.exports = (req, res, next) => {
	// Removing based on id of person
	if (req.body.personId) {
		console.log('here!');
		Person.findByIdAndRemove(req.body.personId, (err) => {
			if (err) {
				console.error(err);
				res.status(400).json(responseMessage.FAIL.SOMETHING_WRONG);
			} else {
				console.log('here!');
				next();
			}
		});
	} else {
		res.status(400).json(responseMessage.FAIL.INC_INV_DATA);
	}
};