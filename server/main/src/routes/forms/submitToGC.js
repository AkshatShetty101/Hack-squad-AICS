// Declaring constants
const Division = require('../../models/division');
module.exports = (req, res, next) => {
	// Setting new form data
	//Hack for requestId
	if (res.locals.user._id) {
		console.log(res.locals.user.division_id);
		Division.findOne({ _id: res.locals.user.division_id }, { gc_id: 1 }, (err, result) => {
			if (err) {
				res.status(400).send({ success: false, message: err });
			} else {
				console.log(result);
				if (result) {
					res.locals.other_id = result.gc_id;
					console.log('Loaded GC ID from db');
					next();
				} else {
					res.status(400).send({ success: false, message: 'No such Division' });
				}
			}
		});
	} else {
		res.status(400).send({ success: false, message: 'Invalid Parameters' });
	}
};