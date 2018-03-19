// Declaring constants
const forms = require('../../models/form');

module.exports = (req, res, next) => {
	forms.findOneAndRemove({ _id: req.body.formId }, function (err) {
		if (err) {
			res.json({ success: false, message: err });
		} else {
			next();
		}
	});
};