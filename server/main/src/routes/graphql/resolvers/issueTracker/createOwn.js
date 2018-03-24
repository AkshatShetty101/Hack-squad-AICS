const IssueTracker = require('../../../../models/issue_tracker');

module.exports = ({ args, context }) => {
	console.log('in IssueTracker createOwn');
	console.log(args);
	console.log(context);
	const issueTracker = new IssueTracker({
		...args
	});
	return new Promise((resolve, reject) => {
		issueTracker.save((err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve({ _id: data._id, data });
			}
		});
	});
};