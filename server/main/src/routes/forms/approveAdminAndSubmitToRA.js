// Declaring constants
const ReqForm = require('../../models/request_form');

module.exports = (req, res, next) => {
	// Setting new form data

	if (req.body.formId && res.locals.requestId) {
		const data = {
			form: {
				form_id: req.body.formId,
				is_approved: false
			}
		};
		console.log(res.locals.requestId);
		ReqForm.findByIdAndUpdate(res.locals.requestId, { $set: data }, { new: true }, (err, result) => {
			if (err) {
				console.error(err);
				res.status(400).json(responseMessage.FAIL.SOMETHING_WRONG);
			} else {
				// Added to DB successfully
				// Now passing control to blockchain
				console.log('Added formId to requestForm');
				res.locals.other_id = result.ra_id;
				const notifToSend = notificationMessage.RA.ADMIN_APP_FORM;
				notifToSend.data = { templateId: req.body.formId, causerId: res.locals.user._id.toString() };
				notificationsHelper.addNotificationToQueue(result.ra_id.toString(), notifToSend);
				next();
			}
		});
	} else {
		res.status(400).json(responseMessage.FAIL.INC_INV_DATA);
	}
};