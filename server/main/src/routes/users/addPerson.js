const person = require('../../models/person');
const divison = require('../../models/division');
const uuid4 = require('uuid/v4');
const passwordGenerator = require('../../utils/passwordGenerator');
module.exports = (req, res, next) => {
	//Some db related work
	divison.findOne({ name: req.body.division_name }, { divison_id: 1 }, function (err, divisionData) {
		console.log(divisionData);
		if (err) {
			res.send({ success: false, message: err });
		} else if (divisionData) {
			let password = passwordGenerator.hash(req.body.password);
			var userData = new person({
				user_id: uuid4(),
				name: {
					firstName: req.body.firstname,
					middleName: req.body.middleName ? req.body.middleName : '',
					lastName: req.body.lastName
				},
				access_form_id: [],
				password: password,
				email: req.body.email,
				divison_id: divisionData.divison_id,
				designation: req.body.designation
			});
			userData.save(function (err) {
				if (err) {
					res.send({ success: false, message: err });
				} else {
					next();
				}
			});
			next();
		} else {
			res.send({ success: false, message: 'No such Division/Group/Organization' });
		}
	});
}