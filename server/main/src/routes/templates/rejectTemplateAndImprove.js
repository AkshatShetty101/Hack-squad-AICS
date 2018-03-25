const ReqForm = require('../../models/request_form');

module.exports = (req, res, next) => {
	if (req.body.templateId && res.locals.requestId) {
		const data = {
			template: {}
		};
		ReqForm.findByIdAndUpdate(res.locals.requestId, { $set: data }, { new: true }, (err, result) => {
			if (err) {
				console.error(err);
				res.status(400).json(responseMessage.FAIL.SOMETHING_WRONG);
			} else {
				// Modified to DB successfully
				// Now passing control to blockchain
				console.log('Cleared the template data');
				res.locals.admin_id = result.admin_id;
				const notifToSend = notificationMessage.ADMIN.RA_REJ_TEMP;
				notifToSend.data = { templateId: req.body.templateId, causerId: res.locals.user._id.toString() };
				notificationsHelper.addNotificationToQueue(res.locals.admin_id.toString(), notifToSend);
				next();
			}
		});
	} else {
		res.status(400).json(responseMessage.FAIL.INC_INV_DATA);
	}
};