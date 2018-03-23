// Declaring constants
const Form = require('../../models/form');
module.exports = (req, res, next) => {
	// Setting new form data
	if (req.body.formId && req.body.deadline && req.body.assigneeId) {
		Form.findByIdAndUpdate({ _id: req.body.formId },
			{ $set: { deadline: req.body.deadline }, $push: { assigned_to: req.body.assigneeId } }, { new: true }, (err, result) => {
				if (err) {
					console.error(err);
					res.status(400).json(responseMessage.FAIL.SOMETHING_WRONG);
				} else {
					console.log(result);
					if (result) {
						console.log('Assigned form and set deadline');
						next();
					} else {
						res.status(400).json(responseMessage.FAIL.FORM.NOT_EXISTS);
					}
				}
			});
	} else {
		res.status(400).json(responseMessage.FAIL.INC_INV_DATA);
	}
};