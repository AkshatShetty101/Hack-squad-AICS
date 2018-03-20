// Declaring constants
form = require('../../models/form');
module.exports = (req, res) => {
	// Setting new form data
	formData = new form({
		template_id: res.locals.templateId,
		created_by: req.body.personId,
		assigned_to: req.body.asignedToId,
		data: req.body.data,
		format: req.body.format
	});
	// Saving form data
	formData.save(function (err, result) {
		if (err) {
			res.send({ success: true, message: err });
		} else {
			// Adding required parameters
			res.locals = req.body;
			res.locals.formId = result._id;
			// Passing contorl to addForm to block-chain
			next();
		}
	});
	// }
	// });
}