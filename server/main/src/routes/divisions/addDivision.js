const division = require('../../models/division');
module.exports = (req, res) => {
	//Some db related work
	division.findOne({ name: req.body.name }, function (err, result) {
		if (err) {
			res.json({ success: false, message: err });
		} else if (result) {
			res.json({ success: false, message: 'Division/Group/Organization already exists' });
		} else {
			let divisionData = new division({
				name: req.body.name,
				type: req.body.type
			});
			divisionData.save(function (err) {
				if (err) {
					res.send({ success: false, message: err });
				}
				else {
					res.send({ successs: true, message: 'Added Division/Group/Organization successfully' });
				}
			});
		}
	});
}