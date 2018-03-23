// Declaring constants
const forms = require('../../models/form');

module.exports = (req, res, next) => {
	if (req.body.formId) {
		forms.findByIdAndRemove(req.body.formId, function (err, result) {
			if (err) {
				console.error(err);
				res.status(400).json(responseMessage.FAIL.SOMETHING_WRONG);
			} else {
				if (result) {
					if (result.is_completed === false) {
						console.log(result);
						next();
					} else {
						res.status(400).json(responseMessage.FAIL.FORM.CANNOT_DELETE);
					}
				} else {
					res.status(400).json(responseMessage.FAIL.FORM.NOT_EXISTS);
				}
			}
		});
	} else {
		res.status(400).json(responseMessage.FAIL.INC_INV_DATA);
	}
};