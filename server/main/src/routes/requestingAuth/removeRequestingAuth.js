const ReqAuth = require('../../models/requesting_authority').default;

module.exports = (req, res) => {
	if (req.body.ra_id) {
		ReqAuth.deleteOne({ _id: req.body.ra_id }, (err, data) => {
			console.log(data);
			if (err) {
				console.error(err);
				res.status(500).json({ success: false, message: 'Error deleting data' });
			} else if (data.n === 0) { // n is the number of records deleted
				res.status(400).json({ success: false, message: 'Authority does not exist' });
			} else {
				res.status(200).json({ success: true, message: 'Authority deleted successfully' });
			}
		});
	} else {
		res.status(400).json({ success: false, message: 'Invalid parameters' });
	}
};