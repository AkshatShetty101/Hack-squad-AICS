const Tesseract = require('tesseract.js');
const path = require('path');

module.exports = (req, res) => {
	console.log(req.body);
	console.log(req.file);
	const TesseractScanner = Tesseract.create({
		workerPath: path.join(__dirname, '../../../', 'node_modules', 'tesseract.js', 'dist', 'worker.js'),
		corePath: path.join(__dirname, '../../../', 'node_modules', 'tesseract.js-core', 'index.js'),
		langPath: path.join(__dirname)
	});
	TesseractScanner
		.recognize(req.files[0])
		.progress((msg) => {
			console.log("PROGRESS:");
			console.log(msg);
		})
		.then((result) => {
			console.log("COMPLETED:\n");
			console.log(result);
			let messageToSend = responseMessage.SUCCESS.SUCCESS;
			messageToSend.data = result.text;
			res.status(200).json(messageToSend);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json(responseMessage.FAIL.SOMETHING_WRONG);
		});
};