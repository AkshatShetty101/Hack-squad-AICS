// Declaring constants
var Template = require('../../models/template');
const Form = require('../../models/form');
module.exports = (req, res, next) => {
	// Setting new form data
	if (req.body.templateId && req.body.deadline) {
		Template.findOne({ _id: req.body.templateId }, { title: 1 }, function (err, result) {
			if (err) {
				console.error(err);
				res.status(500).json(responseMessage.FAIL.SOMETHING_WRONG);
			} else {
				console.log(result);
				if (result.title) {
					let formData = new Form({
						template_id: req.body.templateId,
						created_by: res.locals.user._id,
						assigned_to: [],
						data: req.body.data,
						files: [],
						deadline: req.body.deadline,
						title: result.title
					});
					// Saving form data
					formData.save((err, result) => {
						if (err) {
							console.error(err);
							res.status(400).json(responseMessage.FAIL.SOMETHING_WRONG);
						} else {
							// Adding required parameters
							console.log('Added Form to DB');
							res.locals.formId = result._id;
							// Passing contorl to addForm to block-chain
							next();
						}
					});
				} else {
					res.status(400).json(responseMessage.FAIL.TEMPLATE.NOT_EXISTS);
				}
			}
		});
	} else {
		res.status(400).json(responseMessage.FAIL.INC_INV_DATA);
	}
};