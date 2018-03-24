const ReqForm = require('../../models/request_form');

module.exports = (req, res, next) => {
	const data = {
		template:{
			template_id: req.body.templateId,
			is_approved: false
		}
	};
	console.log(res.locals.requestId);
	ReqForm.findByIdAndUpdate(res.locals.requestId, { $set: data },{ new:true }, (err, result) => {
		if (err) {
			console.error(err);
			res.status(400).json(responseMessage.FAIL.SOMETHING_WRONG);
		} else {
			// Added to DB successfully
			// Now passing control to blockchain
			console.log('Added templateId to requestForm');
			res.locals.ra_id = result.ra_id;
			next();
		}
	});
};