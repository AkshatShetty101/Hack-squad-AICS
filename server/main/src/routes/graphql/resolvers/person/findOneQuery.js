const Person = require('../../../models/person');

module.exports = ({ args, context }) => {
	const { req, res } = context;
	let query = {};
	if (args.self) {
		query = { _id: res.locals.user._id };
		return new Promise((resolve, reject) => {
			Person.findOne(query, (err, data) => {
				if (err) {
					console.error(err);
					reject(err);
				} else {
					console.log(data);
					resolve(data);
				}
			});
		});
	}

	if (res.locals.user.designation === 'admin') {
		query.designation = 'gc';
	} else {
		query.designation = 'user';
		query.division_id = res.locals.user.division_id;
	}
	return new Promise((resolve, reject) => {
		Person.findOne(query, (err, data) => {
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