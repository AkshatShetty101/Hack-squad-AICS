// Declaring constants
const template = require('../../models/template');

module.exports = (req, res, next) => {
	// Setting data for new template
	if (res.locals.user._id && req.body.tags && req.body.format && req.body.requestId) {
		let templateData = new template({
			created_by: res.locals.user._id,
			tags: req.body.tags,
			format: req.body.format
		});
		// Saving template to DB
		templateData.save((err, result) => {
			if (err) {
				res.status(400).send({ success: false, message: err });
			} else {
				console.log('Added Template to DB');
				// Adding required parameters
				res.locals.templateId = result._id;
				// Passing control to addForm to DB
				next();
			}
		});
	} else {
		res.status(400).send({ success: false, message: 'Insufficient parameters' });
	}
};