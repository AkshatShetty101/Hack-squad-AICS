// Declaring constants
person = require('../../models/person');

module.exports = (req, res) => {
	//Finding person data with email provided
	person.findOne({ email: req.body.email }, { _id: 1 }, function (err, result) {
		if (err) {
			res.json({ success: false, message: err });
		} else if (!result) {
			//
			res.json({ success: true, message: 'No such user!' });	
		} else {
			// Returning with _id of person 
			res.json({ success: false, message: result._id });
		}
	});
};