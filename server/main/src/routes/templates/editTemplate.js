const Template = require('../../models/template');

module.exports = (req, res, next) => {
	if (req.body.templateId && req.body.update && (req.body.update.title
		|| req.body.update.format || req.body.update.tags)) {
		let newData = {};
		if (req.body.update.title) {
			newData.title = req.body.update.title;
		}
		if (req.body.update.tags) {
			newData.tags = req.body.update.tags;
		}
		if (req.body.format) {
			newData.format = req.body.update.format;
		}
		Template.findByIdAndUpdate(req.body.templateId, { $set: newData }, (err, result) => {
			if (err) {
				console.error(err);
				res.status(400).json(responseMessage.FAIL.SOMETHING_WRONG);
			} else {
				if (result) {
					console.log('Updated template in DB');
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