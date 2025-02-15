const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const config = require('config');
const NS = config.get('NS');
const NS_F = config.get('NS_F');
const NS_T = config.get('NS_T');
module.exports = exports = {};

exports.getMyForms = (req, res) => {
	this.bizNetworkConnection = new BusinessNetworkConnection();
	this.cardName = config.get('cardName');
	return this.bizNetworkConnection.connect(this.cardName)
		.then(() => {
			var query = this.bizNetworkConnection.buildQuery(
				'SELECT ' + NS_F + ' WHERE (assigneeId CONTAINS _$inputValue)');
			return this.bizNetworkConnection.query(query, { inputValue: res.locals.user._id.toString() });
		})
		.then((assets) => {
			let promise = new Promise((resolve, reject) => {
				let list = [];
				for (let data of assets) {
					console.log(data.formId);
					list.push({ formId: data.formId, isDeleted: data.isValid });
				}
				resolve(list);
			});
			promise.then((data) => {
				let messageToSend = responseMessage.SUCCESS.SUCCESS;
				messageToSend.data = data;
				res.status(200).json(messageToSend);
			}).catch((err) => {
				console.error(err.message);
				res.status(500).json(responseMessage.FAIL.SOMETHING_WRONG);
			});
		})
		.catch((err) => {
			console.error(err.message);
			res.status(500).json(responseMessage.FAIL.SOMETHING_WRONG);
			// Add optional error handling here.
		});
};

const ReqForm = require('../../models/request_form');
exports.getTemplateRequestId = (req, res, next) => {
	// this.bizNetworkConnection = new BusinessNetworkConnection();
	// this.cardName = config.get('cardName');
	// if (req.body.templateId) {
	// 	return this.bizNetworkConnection.connect(this.cardName)
	// 		.then((result) => {
	// 			this.businessNetworkDefinition = result;
	// 			// Getting factory definitions
	// 			console.log(req.body.templateId);
	// 			var query = this.bizNetworkConnection.buildQuery(
	// 				'SELECT ' + NS_T + ' WHERE (templateId == _$inputValue)');
	// 			return this.bizNetworkConnection.query(query, { inputValue: req.body.templateId });
	// 		})
	// 		.then((asset) => {
	// 			console.log('[QUERY getTemplateRequestId]', asset);
	// 			res.locals.requestId = asset[0].requestId;
	// 			next();
	// 		})
	// 		.catch((err) => {
	// 			console.error(err.message);
	// 			res.status(500).json(responseMessage.FAIL.TEMPLATE.NOT_EXISTS);
	// 			// Add optional error handling here.
	// 		});
	// } else {
	// 	console.error(err.message);
	// 	res.status(500).json(responseMessage.FAIL.INC_INV_DATA);
	// }
	if (req.body.templateId) {
		console.log('finding reqId of templateId!');
		ReqForm.findOne({ 'template.template_id': req.body.templateId }, { _id: 1 }, (err, doc) => {
			if (err) {
				console.error(err);
				res.status(500).json(responseMessage.FAIL.SOMETHING_WRONG);	
			} else {
				console.log(doc);
				if (doc) {
					res.locals.requestId = doc._id;
					console.log('getTemplateRequestId reached!');
					next();
				} else {
					// console.error(err.message);
					res.status(500).json(responseMessage.FAIL.TEMPLATE.NOT_EXISTS);
				}
			}
		});
	} else {
		console.error(err.message);
		res.status(500).json(responseMessage.FAIL.INC_INV_DATA);
	}
};

exports.getFormRequestId = (req, res, next) => {
	this.bizNetworkConnection = new BusinessNetworkConnection();
	this.cardName = config.get('cardName');
	if (req.body.formId) {
		return this.bizNetworkConnection.connect(this.cardName)
			.then((result) => {
				this.businessNetworkDefinition = result;
				// Getting factory definitions
				console.log(req.body.formId);
				var query = this.bizNetworkConnection.buildQuery(
					'SELECT ' + NS_F + ' WHERE (formId == _$inputValue)');
				return this.bizNetworkConnection.query(query, { inputValue: req.body.formId });
			})
			.then((asset) => {
				res.locals.requestId = asset[0].requestId;
				next();
			})
			.catch((err) => {
				console.error(err.message);
				res.status(500).json(responseMessage.FAIL.SOMETHING_WRONG);
				// Add optional error handling here.
			});
	} else {
		console.error(err.message);
		res.status(500).json(responseMessage.FAIL.INC_INV_DATA);
	}
};

exports.getMyCurrentFormsPromise = (req, res) => {
	this.bizNetworkConnection = new BusinessNetworkConnection();
	this.cardName = config.get('cardName');
	return this.bizNetworkConnection.connect(this.cardName)
		.then(() => {
			console.log('in1');
			var query = this.bizNetworkConnection.buildQuery(
				'SELECT ' + NS_F + ' WHERE (assigneeId CONTAINS _$inputValue)');
			return this.bizNetworkConnection.query(query, { inputValue: res.locals.user._id.toString() });
		})
		.then((assets) => {
			return new Promise((resolve, reject) => {
				let list = [];
				for (let data of assets) {
					console.log(data.formId);
					list.push(data.formId);
				}
				resolve(list);
			});
		})
		.catch((err) => {
			console.error(err.message);
			res.status(500).json(responseMessage.FAIL.SOMETHING_WRONG);
			// Add optional error handling here.
		});
};

exports.getFormProgress = (req, res) => {
	this.bizNetworkConnection = new BusinessNetworkConnection();
	this.cardName = config.get('cardName');

	return this.bizNetworkConnection.connect(this.cardName)
		.then(() => {
			var query = this.bizNetworkConnection.buildQuery(
				`SELECT org.acme.aics.FormEvent
				WHERE(form == _$inputValue)`);
			return this.bizNetworkConnection.query(query, { inputValue: "resource:org.acme.aics.Form#" + req.body.formId });
		})
		.then((assets) => {
			console.log(assets);
			if (assets.length) {
				new Promise((resolve, reject) => {
					assets.sort(function (x, y) {
						return y.timestamp - x.timestamp;
					});
					resolve(assets);
				}).then((data) => {
					console.log(data);
					let output = {
						...responseMessage.SUCCESS.SUCCESS,
						currentStage: assets[0].type,
						metadata: assets[0].metadata
					}
					res.status(200).json(output);
				}).catch((err) => {
					console.error(err);
					res.status(500).json(responseMessage.FAIL.SOMETHING_WRONG);
				})
			} else {
				res.status(200).send(responseMessage.FAIL.FORM.NOT_EXISTS);
			}
		})
		.catch((err) => {
			console.error(err.message);
			res.status(500).json(responseMessage.FAIL.SOMETHING_WRONG);
			// Add optional error handling here.
		});
}


exports.getTemplateProgress = (req, res) => {
	this.bizNetworkConnection = new BusinessNetworkConnection();
	this.cardName = config.get('cardName');

	return this.bizNetworkConnection.connect(this.cardName)
		.then(() => {
			var query = this.bizNetworkConnection.buildQuery(
				`SELECT org.acme.aics.TemplateEvent
				WHERE(template == _$inputValue)`);
			return this.bizNetworkConnection.query(query, { inputValue: "resource:org.acme.aics.Template#" + req.body.templateId });
		})
		.then((assets) => {
			console.log(assets);
			if (assets.length) {
				new Promise((resolve, reject) => {
					assets.sort(function (x, y) {
						return y.timestamp - x.timestamp;
					});
					resolve(assets);
				}).then((data) => {
					console.log(data);
					let output = {
						...responseMessage.SUCCESS.SUCCESS,
						currentStage: assets[0].type,
						metadata: assets[0].metadata
					}
					res.status(200).json(output);
				}).catch((err) => {
					console.error(err);
					res.status(500).json(responseMessage.FAIL.SOMETHING_WRONG);
				})
			} else {
				res.status(200).json(responseMessage.FAIL.FORM.NOT_EXISTS);
			}
		})
		.catch((err) => {
			console.error(err.message);
			res.status(500).json(responseMessage.FAIL.SOMETHING_WRONG);
			// Add optional error handling here.
		});
}