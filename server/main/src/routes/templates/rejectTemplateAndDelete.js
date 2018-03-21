const ReqForm = require('../../models/request_form');
const Template = require('../../models/template');

module.exports = (req, res, next) => {
	if (req.body.templateId && res.locals.requestId) {
		ReqForm.findOneAndRemove({ _id: res.locals.requestId }, { select: 'admin_id' },(err, result) => {
			if(err) {
				res.status(400).send({ success: false, message: err });
			} else {
				console.log(result);
				// Modified to DB successfully
				// Now passing control to blockchain
				Template.findOneAndRemove({ _id: req.body.templateId }, (err) => {
					if (err) {
						res.status(400).send({ success: false, message: err });
					} else {
						console.log('Removed request of RA and delteted template form DB');
						res.locals.admin_id = result.admin_id;
						next();
					}
				});
			}
		});
	} else {
		res.status(400).send({ success: false, message: 'Insufficient Parameters' });
	}

};