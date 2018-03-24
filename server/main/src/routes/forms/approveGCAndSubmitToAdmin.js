// Declaring constants
const Form = require('../../models/form');

module.exports = (req, res, next) => {
	// Setting new form data
	if (req.body.formId) {
		Form.findById(req.body.formId, { created_by: 1 }, (err, result) => {
			if (err) {
				console.error(err);
				res.status(400).json(responseMessage.FAIL.SOMETHING_WRONG);
			} else {
				console.log(result);
				if (result) {
					res.locals.other_id = result.created_by;
					console.log('Loaded Admin ID from db');
					next();
				} else {
					res.status(400).json(responseMessage.FAIL.FORM.NOT_EXISTS);
				}
			}
		});
	} else {
		res.status(400).json(responseMessage.FAIL.INC_INV_DATA);
	}
};