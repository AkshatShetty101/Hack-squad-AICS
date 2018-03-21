const Template = require('../../models/template');
const ReqForm = require('../../models/request_form');

module.exports = (req, res, next) => {
	let data = {
		template:{
			template_id: req.body.templateId,
			is_approved: false
		}
	};
	console.log(res.locals.requestId);
	ReqForm.findByIdAndUpdate(res.locals.requestId, { $set: data },{new:true}, (err, result) => {
		if (err) {
			res.status(400).send({ success: false, message: err });
		} else {
			// Added to DB successfully
			// Now passing control to blockchain
			console.log('Added templateId to requestForm');
			res.locals.ra_id = result.ra_id;
			next();
		}
	});
};