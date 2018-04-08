const IssueTracker = require('../../models/issue_tracker').default;

module.exports = (req, res) => {
	if (req.body.issueId) {
		if (req.body.type === 'ISSUE') {
			console.log("USSUE")
			IssueTracker.deleteOne({ _id: req.body.issueId }, (err, raw) => {
				if (err) {
					res.status(500).json(responseMessage.FAIL.SOMETHING_WRONG);
				} else {
					console.log('issue deleted', raw);
					res.status(200).json(responseMessage.SUCCESS.SUCCESS);
				}
			});
		} else if (req.body.type === 'COMMENT') {
			console.log("USSUE2")
			if (req.body.commentId) {
				IssueTracker.updateOne({ _id: req.body.issueId },
					{ $pull: { data: { _id: req.body.commentId } } }, (err, raw) => {
						if (err) {
							console.error(err);
							res.status(500).json(responseMessage.FAIL.SOMETHING_WRONG);
						} else {
							console.log('issue comment deleted', raw);
							res.status(200).json(responseMessage.SUCCESS.SUCCESS);
						}
					});
			} else {
				res.status(400).json(responseMessage.FAIL.INC_INV_DATA);
			}
		} else {
			console.log('Invalid type provided in body');
			res.status(400).json(responseMessage.FAIL.INC_INV_DATA);
		}
	} else {
		console.log('No issueId in body');
		res.status(400).json(responseMessage.FAIL.INC_INV_DATA);
	}
};