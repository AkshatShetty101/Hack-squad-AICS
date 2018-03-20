// Declaring constants
const person = require('../../models/person');

module.exports = (req, res, next) => {
	// Removing based on id of person
	console.log('here!');
	person.findByIdAndRemove(req.body.personId, function (err) {
		if (err) {
			console.error(err);
			res.json({ success: false, message: 'Invalid Id' });
		} else {
			console.log('here!');
			next();
		}
	});
};