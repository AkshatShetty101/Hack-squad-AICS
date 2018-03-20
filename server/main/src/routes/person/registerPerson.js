// Declaring constants
const Person = require('../../models/person');
const Divison = require('../../models/division');
const passwordGenerator = require('../../utils/passwordGenerator').hash;

module.exports = (req, res, next) => {
	// Checking if department is registered
	if (req.body.email && req.body.email.length > 0 && req.body.password && req.body.password.length > 0
		&& req.body.name && req.body.name.firstName && req.body.name.firstName.length > 0
		&& req.body.name.lastName && req.body.name.middleName && req.body.name.lastName.length > 0
		&& req.body.designation && req.body.designation.length > 0 && req.body.division_name
		&& req.body.division_name.length > 0) {
		Divison.findOne({ name: req.body.division_name }, { _id: 1 }, (err, divisionData) => {
			if (err) {
				console.error(err);
				res.status(500).json({ success: false, message: 'Error fetching division' });
			} else if (divisionData) {
				// If department exists add person to DB
				let password = passwordGenerator(req.body.password);
				var userData = new Person({
					name: {
						firstName: req.body.name.firstName,
						middleName: req.body.name.middleName ? req.body.name.middleName : '',
						lastName: req.body.name.lastName
					},
					access_form_id: [],
					password: password,
					email: req.body.email,
					division_id: divisionData._id,
					designation: req.body.designation
				});
				userData.save((err, result) => {
					if (err) {
						console.error(err);
						res.status(500).json({ success: false, message: 'Error saving data' });
					} else {
						// Adding parameters before passing to block-chain
						res.locals = req.body;
						res.locals.personId = result._id;
						// Passing control to block-chain
						next();
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