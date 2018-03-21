/*eslint-disable*/
// Declaring constants
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const config = require('config');

// Declaring block-chain related information
this.bizNetworkConnection = new BusinessNetworkConnection();
this.cardName = config.get('cardName');
this.businessNetworkIdentifier = config.get('bna');
this.NS = config.get('NS');
this.NS_T = config.get('NS_T');
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
			let ra = factory.newRelationship(this.NS, 'Person', res.locals.ra_id.toString());
			let transaction = factory.newTransaction(this.NS, 'TemplateEvent');
			transaction.person = asignee;
			transaction.newHolder = ra;
			transaction.type = 'template_submit';
			if (req.body.metadata)
				transaction.metadata = JSON.stringify(req.body.metadata);
			else
				transaction.metadata = '{}';
			transaction.template = factory.newRelationship(this.NS, 'Template', req.body.templateId);
			// Submitting the transaction
			this.bizNetworkConnection.submitTransaction(transaction).then(() => {
                // Returning response
                console.log('Template submit transaction added to blockchain');
				res.json({ 'success': true, 'message': 'Template submitted for RA successfully' });
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