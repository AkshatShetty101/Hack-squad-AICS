const Form = require('../../../../models/form');

// if args has _id, query Form by _id otherwise query by the forms he owns
module.exports = ({ args, context }) => {
	const { req, res } = context;
	console.log(args);
	let query = args._id ? { ...args.filter  } : { assigned_to: res.locals.user._id, ...args.filter };
	let sort = args.sort === 'ASC' ? 1 : -1;
	let sortBy = args.sortBy ? args.sortBy === 'createdAt' ? { createdAt: sort } : { updatedAt: sort } : {};
	console.log(query);
	return new Promise((resolve, reject) => {
		Form.find(query)
			.skip(args.skip || 0)
			.limit(args.limit || 20)
			.sort(sortBy)
			.exec((err, data) => {
				if (err) {
					console.error(err);
					reject(err);
				} else {
					// console.log(data);
					resolve(data);
				}
			});
	});
};