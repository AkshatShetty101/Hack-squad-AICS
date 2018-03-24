const IssueTracker = require('../../models/issue_tracker').default;

module.exports = (req, res) => {
	if (req.body.heading && req.body.heading.title) {
		const newIssue = new IssueTracker({
			created_by: res.locals.user._id,
			tags: req.body.tags || [],
			...req.body
		});
		newIssue.save((err, data) => {
			if (err) {
				console.error(err);
				res.status(500).json(responseMessage.FAIL.SOMETHING_WRONG);
			} else {
				let messageToSend = responseMessage.SUCCESS.SUCCESS;
				messageToSend.issue_id = data._id;
				res.status(200).json(messageToSend);
			}
		});
	} else {
		res.status(400).json(responseMessage.FAIL.INC_INV_DATA);
	}
};