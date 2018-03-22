/**
 * eslint disable
*/

// Declaring constants
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
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
			this.businessNetworkDefinition = result;
			// Getting factory definitions
			let factory = this.businessNetworkDefinition.getFactory();
			// Loading form registry
			let asignee = factory.newRelationship(this.NS, 'Person', res.locals.user._id.toString());
			let newHolder = factory.newRelationship(this.NS, 'Person', req.body.assigneeId.toString());
			let transaction = factory.newTransaction(this.NS, 'FormEvent');
			transaction.person = asignee;
			transaction.newHolder = newHolder;
			transaction.type = 'assign';
			if (req.body.metadata)
				transaction.metadata = JSON.stringify(req.body.metadata);
			else
				transaction.metadata = '{}';
			transaction.form = factory.newRelationship(this.NS, 'Form', req.body.formId);
			// Submitting the transaction
			this.bizNetworkConnection.submitTransaction(transaction).then(() => {
				// Returning response
				console.log('Form Assigned successfully');
				res.json({ 'success': true, 'message': 'Form Assigned successfully' });
			}).catch((err) => {
				// Catching errors
				console.log(err.message);
				res.send({ 'success': false, 'message': err.message });
			});
		})
		.catch(err => {
			// Catching errors
			console.log(err);
			res.send({ 'success': false, 'message': err.message });
		});
};