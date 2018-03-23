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
			console.log('in1');
			var query = this.bizNetworkConnection.buildQuery(
				'SELECT ' + NS_F + ' WHERE (assigneeId CONTAINS _$inputValue)');
			return this.bizNetworkConnection.query(query, { inputValue: req.body._id });
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

exports.getTemplateRequestId = (req, res, next) => {
	this.bizNetworkConnection = new BusinessNetworkConnection();
	this.cardName = config.get('cardName');
	if (req.body.templateId) {
		return this.bizNetworkConnection.connect(this.cardName)
			.then((result) => {
				this.businessNetworkDefinition = result;
				// Getting factory definitions
				console.log(req.body.templateId);
				var query = this.bizNetworkConnection.buildQuery(
					'SELECT ' + NS_T + ' WHERE (templateId == _$inputValue)');
				return this.bizNetworkConnection.query(query, { inputValue: req.body.templateId.toString() });
			})
			.then((asset) => {
				res.locals.requestId = asset[0].requestId;
				next();
			})
			.catch((error) => {
				console.error(err.message);
				res.status(500).json(responseMessage.FAIL.TEMPLATE.NOT_EXISTS);
				// Add optional error handling here.
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
				return this.bizNetworkConnection.query(query, { inputValue: req.body.formId.toString() });
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