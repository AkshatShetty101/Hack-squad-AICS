// Declaring constants
const Form = require('../../models/form');

module.exports = (req, res, next) => {
	// Setting new form data
	//Hack for requestId
	if (res.locals.user._id) {
		Form.findById(req.body.formId, { created_by: 1 }, (err, result) => {
			if (err) {
				res.status(400).send({ success: false, message: err });
			} else {
				console.log(result);
				if (result) {
					res.locals.other_id = result.created_by;
					console.log('Loaded Admin ID from db');
					next();
				} else {
					res.status(400).send({ success: false, message: 'No such form' });
				}
			}
		});
	} else {
		res.status(400).send({ success: false, message: 'Invalid Parameters' });
	}
};