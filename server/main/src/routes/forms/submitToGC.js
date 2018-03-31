const Division = require('../../models/division');
const notificationsHelper = require('../../utils/notificationsHelper');
const mailerHelper = require('../../utils/mailerHelper');

module.exports = (req, res, next) => {
	// Setting new form data
	Division.findOne({ _id: res.locals.user.division_id }, { gc_id: 1 }, (err, result) => {
		if (err) {
			res.status(400).json(responseMessage.FAIL.SOMETHING_WRONG);
		} else {
			console.log(result);
			if (result) {
				res.locals.other_id = result.gc_id;
				console.log('Loaded GC ID from db');
				const notifToSend = notificationMessage.GC.USER_SUB_FORM;
				notifToSend.data = { formId: req.body.formId,causerId: res.locals.user._id.toString() };
				notificationsHelper.addNotificationToQueue(result.gc_id.toString(), notifToSend);
				let mailToSend = mailerHelper.mailData(`
				Krilin Tripathi <krilintripathi@meity.gov.in>`, // Random name & email <- GC
					'A form has been submitted by a person in your division', '',
					`Hey <b>Rajesh</b>,<br/>
				<br/>
				<p>A form has been submitted by a person in your division and awaits your approval.<br/>
				Submitter_Id: <i>${res.locals.user._id.toString()}</i> Form_Id: <i>${req.body.formIdId.toString()}</i></p>
				<br/>
				Thanks,<br/>
				AICS MeitY Team`);
				mailerHelper.sendMail(mailToSend);
				next();
			} else {
				res.status(400).json(responseMessage.FAIL.DIVISION.NOT_EXISTS);
			}
		}
	});
};