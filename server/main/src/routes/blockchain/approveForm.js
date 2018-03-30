/**eslint-disable */
const config = require('config');

// Declaring block-chain related information
this.bizNetworkConnection = new BusinessNetworkConnection();
this.cardName = config.get('cardName');
this.businessNetworkIdentifier = config.get('bna');
this.NS = config.get('NS');
this.NS_F = config.get('NS_F');
this.NS_P = config.get('NS_P');

module.exports = (req, res,next) => {
	// Establishing connection
	this.bizNetworkConnection.connect(this.cardName)
		.then((result) => {
			this.businessNetworkDefinition = result;
			// Getting factory definitions
			let factory = this.businessNetworkDefinition.getFactory();
			// Loading form registry
			let asignee = factory.newRelationship(this.NS, 'Person', res.locals.user._id.toString());
			let transaction = factory.newTransaction(this.NS, 'FormEvent');
			transaction.person = asignee;
			transaction.newHolder = asignee;
			transaction.type = 'approve';
			if (req.body.metadata) {
				transaction.metadata = JSON.stringify(req.body.metadata);
			} else {
				transaction.metadata = '{}';
			}
			transaction.form = factory.newRelationship(this.NS, 'Form', req.body.formId);
			// Submitting the transaction
			this.bizNetworkConnection.submitTransaction(transaction).then(() => {
				// Returning response
				console.log('Form Approved successfully');
				// next();
				res.status(200).json(responseMessage.SUCCESS.SUCCESS);
			}).catch((err) => {
				console.log(err);
				// Catching errors
				console.error(err.message);
				res.status(500).json(responseMessage.FAIL.SOMETHING_WRONG);
			});
		})
		.catch(err => {
			// Catching errors
			console.error(err.message);
			res.status(500).json(responseMessage.FAIL.SOMETHING_WRONG);
		});
};