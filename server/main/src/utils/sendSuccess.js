module.exports = (req, res) => {
	if (res.locals.requestId) {
		let messageToSend = responseMessage.SUCCESS.SUCCESS;
		messageToSend.data = { requestId: res.locals.requestId };
		res.status(200).json(messageToSend);
	} else {
		res.status(200).json(responseMessage.SUCCESS.SUCCESS);
	}
};