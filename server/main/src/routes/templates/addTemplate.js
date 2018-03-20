// Declaring constants
template = require('../../models/template');
person = require('../../models/person');

module.exports = (req, res) => {
	// Setting data for new template
	templateData = new template({
		created_by: req.body.personId,
		tags = req.body.tags,
		format: req.body.format
	});
	// Saving template to DB
	templateData.save(function (err, result) {
		if (err) {
			res.send({ success: true, message: err });
		} else {
			// Adding required parameters
			res.locals = req.body;
			res.locals.templateId = result._id;
			// Passing contorl to addForm to DB
			next();
		}
	});
}