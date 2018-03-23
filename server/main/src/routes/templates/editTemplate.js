const template = require('../../models/template');
module.exports = (req, res, next) => {
	// let newForm = {
	// 	data: req.body.data
	// };
	let newData = {};
	if (req.body.title) {
		newData.title = req.body.title;
	}
	if (req.body.tags) {
		newData.tags = req.body.tags;
	}
	if (req.body.format) {
		newData.format = req.body.format;
	}
	console.log(newData);
	if (req.body.templateId && (newData.title || newData.format || newData.tags)) {
		template.findByIdAndUpdate(req.body.templateId, { $set: newData }, (err, result) => {
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