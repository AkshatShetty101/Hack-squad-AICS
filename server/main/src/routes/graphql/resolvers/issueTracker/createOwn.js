const IssueTracker = require('../../../../models/issue_tracker').default;

module.exports = ({ args, context }) => {
	console.log('in IssueTracker createOwn');
	console.log(args);
	console.log(context);
	const issueTracker = new IssueTracker({
		...args.record
	});
	return new Promise((resolve, reject) => {
		issueTracker.save((err, data) => {
			if (err) {
				console.error(err);
				reject(err);
			} else {
				console.log(data);
				resolve({ _id: data._id, data });
			}
		});
	});
};