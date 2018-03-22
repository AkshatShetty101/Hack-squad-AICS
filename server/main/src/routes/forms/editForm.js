const Form = require('../../models/form');
const fs = require('fs-extra');
const formidable = require('formidable');
const path = require('path');

module.exports = (req, res, next) => {
	var pathToUploadTo = path.join(__dirname, '../../../uploads', req.body.formId.toString());

	fs.ensureDirSync(pathToUploadTo); //ensures that the path exists
	console.log(req.files);

	const form = new formidable.IncomingForm();
	form.parse(req, (err, fields, files) => {
		console.log('fields:', fields, 'files:', files);
		let fileNames = '';
		Form.findByIdAndUpdate(req.body.formId,
			{ $set: { data: req.body.data, files: fileNames } },
			{ new: true },
			(err, data) => {
				if (err) {
					res.status(400).send({ success: false, message: 'Error updating forms' });
				} else {
					console.log(data);
					if (data) {
						console.log('Form updated');
						next();
					} else {
						res.status(400).send({ success: false, message: 'No such form' });
					}
				}
			});
	});
};