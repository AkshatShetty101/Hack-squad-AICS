const IssueTracker = require('../../../../models/issue_tracker');

module.exports = ({ args, context }) => {
	const { req, res } = context;
	return new Promise((resolve, reject) => {
		IssueTracker.aggregate([{ $group: { _id: args._id, count: { $size: '$data' } } }], (err, result) => {
			if (err) {
				reject(err);
			} else {
				console.log(result);
				resolve(result.count);
			}
		});
	});
};