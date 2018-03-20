// Declaring constants
person = require('../../models/person');

module.exports = (req, res) => {
	//Finding all people with the same type as provided
	person.find({ type: req.body.type }, { _id: 1, name: 1, division: 1 }, function (err, result) {
		if (err) {
			res.json({ success: true, message: err });
		} else {
			// Returning with data of people 
			res.json({ success: true, message: result._id });
		}
	});
};