const IssueTracker = require('../../models/issue_tracker').default;

/**
 * {
 * 	type: 'ISSUE' || 'COMMENT' <=== ISSUE can update issue level fields including adding a comment, COMMENT only update comment
 *  issueId,
 *  commentId (for type 'COMMENT')
 *  update (fields to be updated)
 * }
 */

module.exports = (req, res) => {
	if (req.body.issueId && req.body.update) {
		if (req.body.type === 'ISSUE') {
			if (req.body.update.heading.title || req.body.update.created_by) {
				console.log('Should not update title or created_by');
				res.status(400).json(responseMessage.FAIL.UNAUTHORISED);
			} else {
				IssueTracker.findById(req.body.issueId, { created_by: 1, data: 1 }, (err, result) => {
					if (err) {
						console.error(err);
						res.status(500).json(responseMessage.FAIL.SOMETHING_WRONG);
					} else {
						if (result) {
							console.log(data);
							let updateFields = { $set: {}, $push: {} };
							let flag = false;
							if (data.created_by === res.locals.user._id) {
								flag = true;
							} else {
								// checking if user is in by list
								result.data.forEach((comment) => {
									if (comment.by === res.locals.user._id) {
										flag = true;
									}
								});
							}
							if (req.body.update.heading.subtitle) {
								updateFields.$set.subtitle = req.body.update.heading.subtitle;
							}
							if (req.body.update.heading.description) {
								updateFields.$set.description = req.body.update.heading.description;
							}
							if (req.body.update.tags) {
								updateFields.$set.tags = req.body.update.heading.tags;
							}
							if (req.body.update.message) {
								const byData = { by: res.locals.user._id, message: req.body.update.message };
								updateFields.$push.data = byData;
							}
							if (flag) {
								IssueTracker.updateOne({ _id: req.body.issueId }, updateFields, (err, raw) => {
									if (err) {
										console.error(err);
										res.status(500).json(responseMessage.FAIL.SOMETHING_WRONG);
									} else {
										console.log('issue comment updated', raw);
										res.status(200).json(responseMessage.SUCCESS.SUCCESS);
									}
								});
							}
						} else {
							res.status(400).json(responseMessage.FAIL.NOT_FOUND);
						}
					}
				});
			}
		} else if (req.body.type === 'COMMENT') {
			if (req.body.commentId) {
				IssueTracker.findOne({ _id: res.body.issueId, 'data.by': res.body.commentId, is_deleted: false }, // If not work then try 'data.$.by'
					{ $set: { 'data.$.message': req.body.update.message, 'data.$.timestamp': Date.now() } },
					(err, raw) => {
						if (err) {
							res.status(500).json(responseMessage.FAIL.SOMETHING_WRONG);
						} else {
							console.log('issue updated', raw);
							res.status(200).json(responseMessage.SUCCESS.SUCCESS);
						}
					});
			} else {
				console.log('No Comment Id in body');
				res.status(400).json(responseMessage.FAIL.INC_INV_DATA);
			}
		} else {
			console.log('Invalid Update type');
			res.status(400).json(responseMessage.FAIL.INC_INV_DATA);
		}
	} else {
		console.log('No Issue Id in body');
		res.status(400).json(responseMessage.FAIL.INC_INV_DATA);
	}
};