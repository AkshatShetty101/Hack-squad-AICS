const ReqForm = require('../../models/request_form');

module.exports = (req, res, next) => {
	console.log('in!');
	if (req.body.templateId && res.locals.requestId) {
		const data = {
			template: {
				template_id: req.body.templateId,
				is_approved: true
			}
		};
		console.log('in!');
		ReqForm.findByIdAndUpdate(res.locals.requestId, { $set: data }, { new: true }, (err, result) => {
			if (err) {
				console.log('in!');
				console.error(err);
				res.status(400).json(responseMessage.FAIL.SOMETHING_WRONG);
			} else {
				console.log('in!');
				// Modified to DB successfully
				// Now passing control to blockchain
				console.log('Set is_approved for the template');
				res.locals.admin_id = result.admin_id;
				next();
			}
		});
	} else {
		res.status(400).json(responseMessage.FAIL.INC_INV_DATA);
	}

};