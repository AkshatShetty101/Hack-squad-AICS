const Form = require('../../models/form');
const notificationsHelper = require('../../utils/notificationsHelper');
const mailerHelper = require('../../utils/mailerHelper');

module.exports = (req, res, next) => {
	Form.findOne({ _id: req.body.formId }, { created_by: 1 }, (err, result) => {
		if (err) {
			res.status(400).json(responseMessage.FAIL.SOMETHING_WRONG);
		} else {
			console.log(result);
			if (result) {
				res.locals.other_id = result.created_by;
				console.log('Loaded Admin ID from db');
				const notifToSend = notificationMessage.ADMIN.GC_APP_FORM;
				notifToSend.data = { formId: req.body.formId, causerId: res.locals.user._id.toString() };
				notificationsHelper.addNotificationToQueue(result.created_by.toString(), notifToSend);
				let mailToSend = mailerHelper.mailData(`
				Rajesh Singhania <rajeshsinghania@meity.gov.in>`, // Random name & email <- Admin
					'A form has been approved by GC', '',
					`Hey <b>Rajesh</b>,<br/>
				<br/>
				<p>A form has been approved by a GC and awaits your approval.<br/>
				Submitter_Id: <i>${res.locals.user._id.toString()}</i> Form_Id: <i>${req.body.formId.toString()}</i></p>
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
};