const translate = require('google-translate-api');

module.exports = (req, res) => {
	if (req.body.data && typeof req.body.data === 'object') {
		let messageToSend = responseMessage.SUCCESS.SUCCESS;
		messageToSend.data = {};
		const getTranslation = (key, resolve, reject) => {
			translate(req.body.data[key], { from: 'en', to: 'hi' })
				.then(result => {
					messageToSend.data[key] = result.text;
					resolve();
				})
				.catch(err => {
					reject(err);
				});
		};

		const translatePromise = Object.keys(res.body.data).map((key) => {
			return new Promise((resolve, reject) => {
				getTranslation(key, resolve, reject);
			});
		});

		Promise.all(translatePromise).then(() => {
			res.status(200).json(messageToSend);
		}).catch((err) => {
			console.error(err);
			res.status(500).json(responseMessage.FAIL.SOMETHING_WRONG);
		});
	} else {
		res.status(400).json(responseMessage.FAIL.INC_INV_DATA);
	}
};