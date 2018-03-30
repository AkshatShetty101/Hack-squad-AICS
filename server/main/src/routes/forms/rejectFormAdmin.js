var Form = require('../../models/form');
var 
const notificationsHelper = require('../../utils/notificationsHelper');
const mailerHelper = require('../../utils/mailerHelper');

module.exports = (req, res, next) => {
	Form.findById(req.body.formId, { created_by: 1 }, (err, result) => {
		if (err) {
			console.error(err);
			res.status(400).json(responseMessage.FAIL.SOMETHING_WRONG);
		} else {
			if (result) {
				res.locals.gc_id = result.created_by;
				mailerHelper.sendMail(mailToSend);
				next();
			} else {
				res.status(400).json(responseMessage.FAIL.FORM.NOT_EXISTS);
			}
		}

	});
};