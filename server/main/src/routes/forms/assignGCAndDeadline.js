const Form = require('../../models/form');
const notificationsHelper = require('../../utils/notificationsHelper');
const mailerHelper = require('../../utils/mailerHelper');

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
						const notifToSend = notificationMessage.GC.ADMIN_ASS_FORM;
						notifToSend.data = { formId: req.body.formId, causerId: res.locals.user._id.toString() };
						notificationsHelper.addNotificationToQueue(req.body.assigneeId.toString(), notifToSend);
						let mailToSend = mailerHelper.mailData(`
						Sunil Bindu <sunilbindu@meity.gov.in>`, // Random name & email <- GC
							'A form has been assigned to your division', '',
							`Hey <b>Sunil</b>,<br/>
						<br/>
						<p>A form has been assigned to your division. Form_Id: <i>${req.body.formId}</i></p>
						<br/>
						Thanks,<br/>
						AICS MeitY Team`);
						mailerHelper.sendMail(mailToSend);
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