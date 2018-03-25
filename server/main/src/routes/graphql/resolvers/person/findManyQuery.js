const Person = require('../../../../models/person');

module.exports = ({ args, context }) => {
	const { req, res } = context;
	let query = !args.self ? { _id: { $ne: res.locals.user._id } } : {};
	if (res.locals.user.designation === 'admin') {
		query.designation = 'gc';
	} else {
		query.designation = 'user';
		query.division_id = res.locals.user.division_id;
	}
	return new Promise((resolve, reject) => {
		Person.find(query, (err, data) => {
			if (err) {
				console.error(err);
				reject(err);
			} else {
				console.log(data);
				resolve(data);
			}
		});
	});
};