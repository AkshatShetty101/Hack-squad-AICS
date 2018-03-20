// Declaring constants
const form = require('../../models/form');
module.exports = (req, res, next) => {
	// Setting new form data
	let formData = new form({
		template_id: res.locals.templateId,
		created_by: req.body.personId,
		assigned_to: req.body.asignedToId,
		data: req.body.data,
		format: req.body.format
	});
	// Saving form data
	formData.save(function (err, result) {
		if (err) {
			res.status(400).send({ success: false, message: err });
		} else {
			// Adding required parameters
			res.locals = req.body;
			console.log(result._id);
			res.locals.formId = result._id.toString();
			// Passing contorl to addForm to block-chain
			next();
		}
	});
};