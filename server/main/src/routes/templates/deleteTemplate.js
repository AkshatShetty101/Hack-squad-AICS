// Declaring constants
const template = require('../../models/form');

module.exports = (req, res, next) => {
	template.findByIdAndRemove(req.body.templateId, function (err,result) {
		if (err) {
			res.status(400).json({ success: false, message: err });
		} else {
			if(result){
				console.log(result);
				next();
			} else {
				res.status(400).json({ success: false, message: 'Template not present in DB' });
			}
		}
	});
};