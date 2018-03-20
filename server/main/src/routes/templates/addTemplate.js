// Declaring constants
const template = require('../../models/template');

module.exports = (req, res, next) => {
	// Setting data for new template
	if (req.body.personId && req.body.tags && req.body.format && req.body.asignedToId && req.body.data) {
		let templateData = new template({
			created_by: req.body.personId,
			tags: req.body.tags,
			format: req.body.format
		});
		// Saving template to DB
		templateData.save(function (err, result) {
			if (err) {
				res.status(400).send({ success: false, message: err });
			} else {
				// Adding required parameters
				res.locals = req.body;
				res.locals.templateId = result._id;
				// Passing contorl to addForm to DB
				next();
			}
		});
	} else {
		res.status(400).send({ success: false, message: 'Insufficient parameters' });
	}
};