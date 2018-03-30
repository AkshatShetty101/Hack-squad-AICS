const ReqForm = require('../../models/request_form');
const notificationsHelper = require('../../utils/notificationsHelper');
const mailerHelper = require('../../utils/mailerHelper');

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
				notifToSend.data = { templateId: req.body.templateId.toString(), causerId: res.locals.user._id.toString() };
				notificationsHelper.addNotificationToQueue(res.locals.admin_id.toString(), notifToSend);
				let mailToSend = mailerHelper.mailData(`
				Rajesh Singhania <rajeshsinghania@meity.gov.in>`, // Random name & email <- Admin
					'A template created by you has been rejected', '',
					`Hey <b>Rajesh</b>,<br/>
				<br/>
				<p>A template created by you has been rejected and has to be improved. Template_Id: <i>${req.body.templateId.toString()}</i></p>
				<br/>
				Thanks,<br/>
				AICS MeitY Team`);
				mailerHelper.sendMail(mailToSend);
				next();
			}
		});
	} else {
		res.status(400).json(responseMessage.FAIL.INC_INV_DATA);
	}
};