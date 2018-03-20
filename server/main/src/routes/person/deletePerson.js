// Declaring constants
const person = require('../../models/person');

module.exports = (req, res, next) => {
	// Removing based on id of person
	console.log('here!');
	person.findByIdAndRemove(req.body.personId, function (err) {
		if (err) {
			res.json({ success: false, message: err });
		} else {
			console.log('here!');
			next();
		}
	});
};