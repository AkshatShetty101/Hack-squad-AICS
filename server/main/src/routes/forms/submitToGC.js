// Declaring constants
const Division = require('../../models/division');
module.exports = (req, res, next) => {
	// Setting new form data
	console.log(res.locals.user.division_id);
	Division.findOne({ _id: res.locals.user.division_id }, { gc_id: 1 }, (err, result) => {
		if (err) {
			res.status(400).json(responseMessage.FAIL.SOMETHING_WRONG);
		} else {
			console.log(result);
			if (result) {
				res.locals.other_id = result.gc_id;
				console.log('Loaded GC ID from db');
				next();
			} else {
				res.status(400).json(responseMessage.FAIL.DIVISION.NOT_EXISTS);
			}
		}
	});
};