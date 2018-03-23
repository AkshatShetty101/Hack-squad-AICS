const Form = require('../../../../models/form');

// if args has _id, query Form by _id otherwise query by the forms he owns
module.exports = ({ args, context }) => {
	const { req, res } = context;
	let query = args._id ? { _id: args._id  } : { assigned_to: res.locals.user._id };
	let projections = args._id ? { } : { _id: 1 };
	console.log(query, projections);
	return new Promise((resolve, reject) => {
		Form.find(query, projections, (err, data) => {
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