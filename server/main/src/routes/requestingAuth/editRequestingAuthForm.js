const ReqAuth = require('../../models/requesting_authority');

module.exports = (req, res) => {
	if (req.body.ra_id && req.body.access_form.form_id && req.body.access_form.metadata ) {
		// Update only that access_form's form_id's metadata which matches with req.body
		ReqAuth.findOneAndUpdate({ _id: req.body.ra_id, 'access_form.form_id': req.body.access_form.form_id },
			{ $set: { 'access_form.$.metadata': req.body.access_form.metadata } }, (err, data) => {
				if (err) {
					console.error(err);
					res.status(500).json({ success: false, message: 'Error fetching data' });
				} else {
					console.log(data);
					res.status(200).json({ success: true, message: 'Access form updated successfully' });
				}
			});
	} else {
		res.status(400).json({ success: false, message: 'Invalid parameters' });
	}
};