const template = require('../../models/template');
module.exports = (req, res, next) => {
	// let newForm = {
	// 	data: req.body.data
	// };
	let newData = {};
	if (req.body.tags) {
		newData.tags = req.body.tags;
	}
	if (req.body.format) {
		newData.format = req.body.format;
	}
	console.log(newData);
	if (req.body.templateId && (newData.format || newData.tags)) {
		template.findByIdAndUpdate(req.body.templateId, { $set: newData }, function (err, result) {
			if (err) {
				res.status(500).send({ success: false, message: err });
			} else {
				if (result) {
					console.log('Updated template in DB');
					next();
				} else {
					res.status(400).send({ success: false, message: 'No such template to edit' });
				}
			}
		});
	} else {
		res.status(400).send({ success: false, message: 'Insufficient Parameters' });
	}

};