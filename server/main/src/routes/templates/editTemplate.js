const template = require('../../models/form');
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
	template.findOneAndUpdate({ _id: req.body.templateId }, { $set: newData }, function (err,result) {
		if (err) {
			res.send({ success: false, message: err });
		} else {
			console.log(result);
			// next();
		}
	});
};