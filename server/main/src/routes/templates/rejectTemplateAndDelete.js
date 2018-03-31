const ReqForm = require('../../models/request_form');
const Template = require('../../models/template');

module.exports = (req, res, next) => {
	if (req.body.templateId) {
		ReqForm.findOneAndRemove({ _id: res.locals.requestId }, { select: ['admin_id', 'ra_id'] },(err, result) => {
			if(err) {
				console.error(err);
				res.status(400).json(responseMessage.FAIL.SOMETHING_WRONG);
			} else {
				console.log(result);
				// Modified to DB successfully
				// Now passing control to blockchain
				Template.findOneAndRemove({ _id: req.body.templateId }, (err) => {
					if (err) {
						console.error(err);
						res.status(400).json(responseMessage.FAIL.SOMETHING_WRONG);
					} else {
						console.log('Removed request of RA and delteted template form DB');
						res.locals.admin_id = result.admin_id;
						res.locals.ra_id = result.ra_id; // to notify ra I need his id
						next();
					}
				});
			}
		});
	} else {
		res.status(400).json(responseMessage.FAIL.INC_INV_DATA);
	}

};