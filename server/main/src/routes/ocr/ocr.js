const Tesseract = require('tesseract.js');

module.exports = (req, res) => {
	console.log(req.files);
	console.log(req.body);
	Tesseract
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