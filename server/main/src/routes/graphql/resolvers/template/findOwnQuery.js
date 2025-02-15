const Template = require('../../../../models/template');

// if args has _id, query template by _id otherwise query by the template he made
module.exports = ({ args, context }) => {
	const { req, res } = context;
	let query = args._id ? { _id: args._id  } : { created_by: res.locals.user._id };
	let projections = args._id ? { } : { _id: 1 };
	console.log(query, projections);
	return new Promise((resolve, reject) => {
		Template.find(query, projections, (err, data) => {
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