// Declaring constants
const person = require('../../models/person');
const divison = require('../../models/division');
const passwordGenerator = require('../../utils/passwordGenerator');
module.exports = (req, res, next) => {
	// Checking if department is registered
	divison.findOne({ name: req.body.division_name }, { _id: 1 }, function (err, divisionData) {
		if (err) {
			res.send({ success: false, message: err });
		} else if (divisionData) {
			// If department exists add person to DB
			let password = passwordGenerator.hash(req.body.password);
			var userData = new person({
				name: {
					firstName: req.body.firstName,
					middleName: req.body.middleName ? req.body.middleName : '',
					lastName: req.body.lastName
				},
				access_form_id: [],
				password: password,
				email: req.body.email,
				division_id: divisionData._id,
				designation: req.body.designation
			});
			userData.save(function (err,result) {
				console.log(err);
				console.log(result);
				if (err) {
					res.send({ success: false, message: err });
				} else {
					// Adding parameters before passing to block-chain
					res.locals = req.body;
					res.locals.personId = result._id;
					// Passing control to block-chain
					next();
				}
			});
		} else {
			res.send({ success: false, message: 'No such Division/Group/Organization' });
		}
	});
};