// Declaring constants
const Form = require('../../models/form');
module.exports = (req, res, next) => {
	// Setting new form data
	//Hack for requestId
	if (res.locals.user._id && req.body.formId && req.body.deadline && req.body.assigneeId) {
		Form.findByIdAndUpdate({ _id: req.body.formId },
			{ $set: { deadline: req.body.deadline }, $push: { assigned_to: req.body.assigneeId } }, { new: true }, function (err, result) {
				if (err) {
					res.status(400).send({ success: false, message: err });
				} else {
					console.log(result);
					if (result) {
						console.log('Assigned form and set deadline');
						next();
					} else {
						res.status(400).send({ success: false, message: 'No such form' });
					}
				}
			});
	} else {
		res.status(400).send({ success: false, message: 'Invalid Parameters' });
	}
};