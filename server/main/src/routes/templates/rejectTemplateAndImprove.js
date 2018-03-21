const ReqForm = require('../../models/request_form');
module.exports = (req, res, next) => {
	if (req.body.templateId && res.locals.requestId) {
		let data = {
			template: {
			}
		};
		ReqForm.findByIdAndUpdate(res.locals.requestId, { $set: data }, { new: true }, (err, result) => {
			if (err) {
				res.status(400).send({ success: false, message: err });
			} else {
				// Modified to DB successfully
				// Now passing control to blockchain
				console.log('Cleared the template data');
				res.locals.admin_id = result.admin_id;
				next();
			}
		});
	} else {
		res.status(400).send({ success: false, message: 'Insufficient Parameters' });
	}

};