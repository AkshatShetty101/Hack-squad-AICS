const template = require('../../models/template');
module.exports = (req, res, next) => {
	// let newForm = {
	// 	data: req.body.data
	// };
	let newData={};
	if(req.body.tags){
		newData.tags=req.body.tags;
	}
	if(req.body.format){
		newData.format=req.body.format;
	}
	console.log(newData);
	template.findByIdAndUpdate(req.body.templateId, { $set: newData }, function (err,result) {
		if (err) {
			res.status(500).send({ success: false, message: err });
		} else {
			console.log('Updated in DB');
			next();
		}
	});
};