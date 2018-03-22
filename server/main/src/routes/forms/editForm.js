const Form = require('../../models/form');
const fs = require('fs');
const path = require('path');
module.exports = (req, res, next) => {
	var p = path.join(__dirname, '../../../db/fileStore', req.body.formId.toString());
	if (fs.existsSync(p)) {
		// Do something
		console.log('Exists!');
	} else {
		console.log('Does not exists!');
		fs.mkdirSync(p);
		console.log('folder created!');
	}
	var promise = new Promise((resolve, reject) => {
		var fileNames = [];
		for (let file in require.body.files) {
			file.mv(path.join(p, file.name), function (err) {
				if (err) {
					console.log(err);
					reject(err);
				}
				else {
					fileNames.push(file.name);
					console.log("File Uploaded!");
				}
			});
		}
		resolve(fileNames);
	});
	// 		if (req.body.data) {
	// 			newData.data = req.body.data;
	// 		}
	// 		if (req.body.title) {
	// 			newData.title = req.body.title;
	// 		}
	// 	console.log(newData);
	// 	if (newData.data) {
	// 		Form.findByIdAndUpdate(req.body.formId, { $set: newData }, function (err, result) {
	// 			if (err) {
	// 				res.status(500).send({ success: false, message: err });
	// 			} else {
	// 				if (result) {
	// 					console.log('Updated form in DB');
	// 					next();
	// 				} else {
	// 					res.status(400).send({ success: false, message: 'No such form to edit' });
	// 				}
	// 			}
	// 		});
	// 	} else {
	// 		res.status(400).send({ success: false, message: 'Insufficient Parameters' });
	// 	}
	// }
}).catch ((err) => {
	res.status(500).send({ success: false, message: err });
});
};