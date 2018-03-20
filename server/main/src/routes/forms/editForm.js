const form = require('../../models/form');
module.exports = (req, res, next) => {
	let newData = {};
	if (req.body.data) {
		newData.data = req.body.data;
	}
	console.log(newData);
	if (newData.data) {
		form.findByIdAndUpdate(req.body.formId, { $set: newData }, function (err, result) {
			if (err) {
				res.status(500).send({ success: false, message: err });
			} else {
				if (result) {
					console.log('Updated form in DB');
					next();
				} else {
					res.status(400).send({ success: false, message: 'No such form to edit' });
				}

			}
		});
	} else {
		res.status(400).send({ success: false, message: 'Insufficient Parameters' });
	}
};