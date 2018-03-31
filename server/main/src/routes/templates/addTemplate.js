const ReqForm = require('../../models/request_form');
const Template = require('../../models/template');

module.exports = (req, res, next) => {
	// Setting data for new template
	if (req.body.format && req.body.title && req.body.requestId) {
		const templateData = new Template({
			created_by: res.locals.user._id,
			tags: req.body.tags ? req.body.tags : [],
			format: req.body.format,
			title: req.body.title
		});
		// Saving template to DB
		templateData.save((err, result) => {
			if (err) {
				console.error(err);
				res.status(400).json(responseMessage.FAIL.SOMETHING_WRONG);
			} else {
				console.log('Added Template to DB');
				// Adding required parameters
				res.locals.templateId = result._id;
				// Passing control to addForm to DB
				ReqForm.updateOne({ _id: req.body.requestId }, { $set: { template: { templateId: result._id } } }, (err, doc) => {
					if (err) {
						console.error(err);
						res.status(400).json(responseMessage.FAIL.SOMETHING_WRONG);
					} else {
						console.log(doc);
						next();
					}
				});
			}
		});
	} else {
		res.status(400).json(responseMessage.FAIL.INC_INV_DATA);
	}
};