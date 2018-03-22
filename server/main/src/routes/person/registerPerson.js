// Declaring constants
const Person = require('../../models/person');
const Division = require('../../models/division');
const passwordGenerator = require('../../utils/passwordGenerator').hash;

module.exports = (req, res, next) => {
	// Checking if department is registered
	if (req.body.email && req.body.email.length > 0 && req.body.password && req.body.password.length > 0
		&& req.body.name && req.body.name.firstName && req.body.name.firstName.length > 0
		&& req.body.name.lastName && req.body.name.lastName.length > 0 && req.body.designation
		&& req.body.designation.length > 0 && req.body.divisionName && req.body.divisionName.length > 0) {
		// console.log("Here");
		Division.findOne({ name: req.body.divisionName }, { _id: 1 }, (err, data) => {
			if (err) {
				console.error(err);
				res.status(500).json({ success: false, message: 'Division does not exist' });
			} else if (data) {
				// If department exists add person to DB
				let password = passwordGenerator(req.body.password);
				var userData = new Person({
					name: req.body.name,
					access_form_id: [],
					password: password,
					email: req.body.email,
					division_id: data._id,
					designation: req.body.designation
				});
				userData.save((err, result) => {
					if (err) {
						console.error(err);
						res.status(400).json({ success: false, message: 'User already exists' });
					} else {
						// Adding parameters before passing to block-chain
						res.locals = req.body;
						res.locals.personId = result._id;
						// Passing control to block-chain
						let updateQuery = { $push: { user_id: result._id } };
						if (req.body.designation === 'gc') {
							updateQuery = { $set: { gc_id: result._id } };
						}
						Division.findOneAndUpdate({ _id: data._id }, updateQuery, (err, doc) => {
							err ? res.status(500).json({ success: false, message: 'Error pushing user to division' })
								: next();
						});
					}
				});
			} else {
				res.status(400).json({ success: false, message: 'No such Division/Group/Organization' });
			}
		});
	} else {
		res.status(400).json({ success: false, message: 'Invalid parameters' });
	}
};