const Form = require('../../models/form');
const notificationsHelper = require('../../utils/notificationsHelper');
const mailerHelper = require('../../utils/mailerHelper');

module.exports = (req, res, next) => {
	if (req.body.formId &&  req.body.assigneeId) {
		Form.findByIdAndUpdate({ _id: req.body.formId },
			{ $push: { assigned_to: req.body.assigneeId } }, { new: true }, (err, result) => {
				if (err) {
					console.error(err);
					res.status(400).json(responseMessage.FAIL.SOMETHING_WRONG);
				} else {
					console.log(result);
					if (result) {
						console.log('Assigned form and set deadline');
						const notifToSend = notificationMessage.USER.GC_ASS_FORM;
						notifToSend.data = { templateId: req.body.formId.toString(), causerId: res.locals.user._id.toString() };
						notificationsHelper.addNotificationToQueue(req.body.assigneeId, notifToSend);
						let mailToSend = mailerHelper.mailData(`
						Krilin Tripathi <krilintripathi@meity.gov.in>`, // Random name & email <- Admin
							'A form has been assigned to you', '',
							`Hey <b>Krilin</b>,<br/>
						<br/>
						<p>A form has been assigned to you. Form_Id: <i>${req.body.formId.toString()}</i></p>
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