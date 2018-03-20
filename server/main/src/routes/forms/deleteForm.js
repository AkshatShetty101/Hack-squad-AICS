// Declaring constants
const forms = require('../../models/form');

module.exports = (req, res, next) => {

	forms.findByIdAndRemove(req.body.formId, function (err, result) {
		if (err) {
			res.status(400).json({ success: false, message: err });
		} else {
			if (result) {
				if (result.is_completed === false) {
					console.log(result);
					next();
				} else {
					res.status(400).json({ success: false, message: 'Form cannot be deleted from repository' });
				}
			} else {
				res.status(400).json({ success: false, message: 'Form not present in DB' });
			}
		}
	});
};