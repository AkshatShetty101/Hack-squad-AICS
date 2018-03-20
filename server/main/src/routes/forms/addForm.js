// Declaring constants
const form = require('../../models/form');
module.exports = (req, res, next) => {
	// Setting new form data
	let formData = new form({
		template_id: res.locals.templateId,
		created_by: res.locals.user._id,
		assigned_to: req.body.asignedToId,
		data: req.body.data
	});
	// Saving form data
	formData.save(function (err, result) {
		if (err) {
			res.status(400).send({ success: false, message: err });
		} else {
			// Adding required parameters
			console.log('Added Form to DB');
			res.locals.formId = result._id.toString();
			// Passing contorl to addForm to block-chain
			next();
		}
	});
};