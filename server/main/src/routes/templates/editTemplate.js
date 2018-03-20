forms = require('../../models/form');
module.exports = (req, res) => {
	let newForm = {
		data: req.body.data
	};
	forms.findOneAndUpdate({ _id: req.body.formId }, { $set: { data: req.body.data } }function (err, result) {
		if (err) {
			res.send({ success: false, message: err });
		} else {
			
		}
	});
	next();
}