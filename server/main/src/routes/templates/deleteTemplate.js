// Declaring constants
const template = require('../../models/template');

module.exports = (req, res, next) => {
	if (req.body.templateId) {
		template.findByIdAndRemove(req.body.templateId, (err, result) => {
			if (err) {
				console.error(err);
				res.status(400).json(responseMessage.FAIL.SOMETHING_WRONG);
			} else {
				if (result) {
					console.log('Template Deleted from DB');
					next();
				} else {
					res.status(400).json(responseMessage.FAIL.TEMPLATE.NOT_EXISTS);
				}
			}
		});
	} else {
		res.status(400).json(responseMessage.FAIL.INC_INV_DATA);
	}
};