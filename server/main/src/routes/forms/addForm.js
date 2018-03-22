// Declaring constants
var Template = require('../../models/template');
const Form = require('../../models/form');
module.exports = (req, res, next) => {
	// Setting new form data
	//Hack for requestId
	res.locals.requestId = '123';
	if (res.locals.user._id && req.body.templateId && req.body.deadline && res.locals.requestId) {
		Template.findOne({ _id: req.body.templateId }, { title: 1 }, function (err, result) {
			if (err) {
				res.status(400).send({ success: false, message: err });
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
				} else {
					res.status(400).send({ success: false, message: 'No such template' });
				}
			}
		});
	} else {
		res.status(400).send({ success: false, message: 'Invalid Parameters' });
	}
};