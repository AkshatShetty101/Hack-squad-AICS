// Declaring constants
const person = require('../../models/person');

module.exports = (req, res, next) => {
	// Removing based on id of person
	forms.findOneAndRemove({ _id: req.body.personId }, function (err) {
		if (err) {
			res.json({ success: false, message: err });
		} else {
			next();
		}
	});
};