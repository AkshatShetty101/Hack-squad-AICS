/**
 * eslint disable
*/

// Declaring constants
const config = require('config');

// Declaring block-chain related information
this.bizNetworkConnection = new BusinessNetworkConnection();
this.cardName = config.get('cardName');
this.businessNetworkIdentifier = config.get('bna');
this.NS = config.get('NS');
this.NS_F = config.get('NS_F');
this.NS_P = config.get('NS_P');

module.exports = (req, res) => {
	// Establishing connection
	this.bizNetworkConnection.connect(this.cardName)
		.then((result) => {
			console.log('Established!1');
			this.businessNetworkDefinition = result;
			// Getting factory definitions
			let factory = this.businessNetworkDefinition.getFactory();
			console.log('Established!2');
			console.log(factory);
			// Loading form registry
			let asignee = factory.newRelationship(this.NS, 'Person', res.locals.user._id.toString());
			let transaction = factory.newTransaction(this.NS, 'FormEvent');
			console.log('Established!3');
			transaction.person = asignee;
			transaction.newHolder = asignee;
			console.log('Established!4');
			transaction.type = 'approve';
			// if (req.body.metadata) {
			// 	transaction.metadata = JSON.stringify(req.body.metadata);
			// } else {
			// 	transaction.metadata = '{}';
			// }
			console.log(asignee);
			transaction.form = factory.newRelationship(this.NS, 'Form', req.body.formId);
			console.log('Established!5');
			// Submitting the transaction
			this.bizNetworkConnection.submitTransaction(transaction).then(() => {
				// Returning response
				console.log('Form Submitted successfully');
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