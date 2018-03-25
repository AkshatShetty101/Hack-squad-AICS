const Form = require('../../../../models/form');
const getMyCurrentFormsPromise = require('../../../blockchain/query').getMyCurrentFormsPromise;

module.exports = ({ args, context }) => {

	const returnPromise = (query) => {
		return new Promise((resolve, reject) => {
			Form.find(query, { deadline: 1 }, (err, data) => {
				console.log(data);
				const currTime = Date.now();
				const result = { RED: 0, YELLOW: 0, GREEN: 0 };
				data.forEach((val) => {
					const yellowTime = new Date(val.deadline);
					yellowTime.setDate(yellowTime.getDate() - 14); // 2 weeks before deadline
					if (val.deadline <= currTime) {
						result.RED++;
					} else if (currTime >= yellowTime) {
						result.YELLOW++;
					} else {
						result.GREEN++;
					}
				});
				err ? reject(err) : resolve(result);
			});
		});
	};

	const { req, res } = context;
	let query = { is_completed: false }; // only incomplete forms
	if (res.locals.user.designation === 'admin') {
		// if admin fetch all
	} else if (res.locals.user.designation === 'gc') {
		query.assignee_id = res.locals.user._id; // if gc fetch only department wise
	} else if (res.locals.user.designation === 'user') {
		getMyCurrentFormsPromise.then((list) => {
			console.log(list);
			query._id = { $in: list }; // if user fetch only self (from blockchain)
			return returnPromise(query);
		}).catch((err) => {
			console.error(err);
			return new Error(err);
		});
	} else {
		return new Error(responseMessage.FAIL.UNAUTHORISED);
	}
	return returnPromise(query);
};