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

module.exports = (req, res, next) => {
	// Establishing connection
	this.bizNetworkConnection.connect(this.cardName)
		.then((result) => {
			this.businessNetworkDefinition = result;
			// Getting factory definitions
			let factory = this.businessNetworkDefinition.getFactory();
			// Loading participant registry
			this.bizNetworkConnection.getParticipantRegistry(this.NS_P)
				.then((personRegistry) => {
					// Verifying if person exists
					personRegistry.exists(res.locals.user._id.toString()).then(() => {
						// Loading the form registry
						this.bizNetworkConnection.getAssetRegistry(this.NS_T)
							.then((templateRegistry) => {
								// Creating relationship for person
								let creator = factory.newRelationship(this.NS, 'Person', res.locals.user._id.toString());
								// Creating a new form asset
								template = factory.newResource(this.NS, 'Template', res.locals.templateId.toString());
								template.createdBy = creator;
								// Adding form to form registry
								templateRegistry.add(template).then((data) => {
									// Creating the transaction
									let transaction = factory.newTransaction(this.NS, 'TemplateEvent');
									transaction.person = creator;
									transaction.newHolder = creator;
									transaction.type = "template_create";
									if (req.body.metadata)
										transaction.metadata = JSON.stringify(req.body.metadata);
									else
										transaction.metadata = "{}";
									transaction.template = factory.newRelationship(this.NS, 'Template', res.locals.templateId.toString());
									// Submitting the transaction
									this.bizNetworkConnection.submitTransaction(transaction).then((result) => {
										// Returning response
										console.log("Template Added successfully to block-chain");
										// next();
										res.json({ 'success': true, 'message': 'Template Added successfully' });
									});
								}).catch((err) => {
									// Catching errors
									console.log(err.message);
									res.send({ 'success': false, 'message': err.message });
								});
							}).catch((err) => {
								// Catching errors
								console.log(err.message);
								res.send({ 'success': false, 'message': err.message });
							});
					}).catch((err) => {
						// Catching errors
						console.log(err.message);
						next();
					});
				});
		})
		.catch(err => {
			// Catching errors
			console.log(err);
			res.send({ 'success': false, 'message': err.message });
		});
}