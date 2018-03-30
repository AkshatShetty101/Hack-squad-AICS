const IssueTracker = require('../../models/issue_tracker').default;
const Form = require('../../models/form');

module.exports = (req, res) => {
	if (req.body.heading && req.body.heading.title && req.body.data && req.body.data.message && req.body.formId) {
		const verifyTags = (tags) => {
			let arrayToReturn = [];
			tags.forEach((val) => {
				if (['doubt', 'incorrect template', 'insufficient data'].indexOf(val) !== -1) {
					arrayToReturn.push(val);
				}
			});
			return arrayToReturn;
		};

		const newIssue = new IssueTracker({
			created_by: res.locals.user._id,
			tags: verifyTags(req.body.tags) || [],
			data: [{ by: res.locals.user._id, message: req.body.data.message }],
			heading: req.body.heading
		});
		console.log(newIssue);
		newIssue.save((err, data) => {
			if (err) {
				console.error(err);
				res.status(500).json(responseMessage.FAIL.SOMETHING_WRONG);
			} else {
				Form.updateOne({ _id: req.body.formId }, { $push: { issue_id: data._id } }, (err, doc) => {
					if (err) {
						console.error(err);
						res.status(500).json(responseMessage.FAIL.SOMETHING_WRONG);
					} else {
						let messageToSend = responseMessage.SUCCESS.SUCCESS;
						messageToSend.issueId = data._id;
						messageToSend.commentId = data.data[0]._id;
						res.status(200).json(messageToSend);
					}
				});
			}
		});
	} else {
		res.status(400).json(responseMessage.FAIL.INC_INV_DATA);
	}
};