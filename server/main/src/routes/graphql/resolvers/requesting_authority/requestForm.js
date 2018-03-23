const reqForm = require('../../../../models/request_form');

// if args has _id, query Form by _id otherwise query by the forms he owns
module.exports = ({ args, context }) => {
	const { req, res } = context;
	let query = { ra_id: res.locals.user._id };
	let projections = {};
	console.log(query, projections);
	return new Promise((resolve, reject) => {
		reqForm.find(query, projections, (err, data) => {
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