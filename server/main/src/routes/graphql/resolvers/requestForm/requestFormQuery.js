const reqForm = require('../../../../models/request_form');

// if args has _id, query reqForm by _id otherwise query by the forms he owns
module.exports = ({ args, context }) => {
	const { req, res } = context;
	let query = res.locals.user._id === 'ra' ? { ra_id: res.locals.user._id } : { admin_id: res.locals.user._id };
	query = { ...query, ...args.filter };
	let sort = args.sort === 'ASC' ? 1 : -1;
	let sortBy = args.sortBy ? args.sortBy === 'createdAt' ? { createdAt: sort } : { updatedAt: sort } : {};
	console.log(query, projections);
	return new Promise((resolve, reject) => {
		reqForm
			.find(query)
			.skip(args.skip || 0)
			.limit(args.limit || 20)
			.sort(sortBy)
			.exec((err, data) => {
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