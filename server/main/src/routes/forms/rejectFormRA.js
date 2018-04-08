var Form = require('../../models/form');
const notificationsHelper = require('../../utils/notificationsHelper');
const mailerHelper = require('../../utils/mailerHelper');

module.exports = (req, res, next) => {
	Form.findById(req.body.formId, { created_by: 1 }, (err, result) => {
		if (err) {
			console.error(err);
			res.status(400).json(responseMessage.FAIL.SOMETHING_WRONG);
		} else {
			if (result) {
				res.locals.admin_id = result.created_by;
				const notifToSend = notificationMessage.ADMIN.RA_REJ_FORM;
				notifToSend.data = { templateId: req.body.templateId, causerId: res.locals.user._id.toString() };
				notificationsHelper.addNotificationToQueue(res.locals.admin_id.toString(), notifToSend);
				let mailToSend = mailerHelper.mailData(`
					Rajesh Singhania <rajeshsinghania@meity.gov.in>`, // Random name & email <- Admin
					'A form has been rejected by RA', '',
					`Hey <b>Rajesh</b>,<br/>
					<br/>
					<p>A form has been rejected by RA.<br/>Form_Id: <i>${req.body.formId.toString()}</i></p>
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