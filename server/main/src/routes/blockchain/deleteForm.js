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
			console.log("In!");
			this.businessNetworkDefinition = result;
			// Getting factory definitions
			let factory = this.businessNetworkDefinition.getFactory();
			// Loading form registry
			this.bizNetworkConnection.getAssetRegistry(this.NS_F)
				.then((formRegistry) => {
					formRegistry.get(req.body.formId).then((data) => {
						data.isValid = false;
						formRegistry.update(data).then(() => {
							this.bizNetworkConnection.getParticipantRegistry(this.NS_P)
								.then((personRegistry) => {
									let asignee = factory.newRelationship(this.NS, 'Person', res.locals.user._id);
									let transaction = factory.newTransaction(this.NS, 'FormEvent');
									transaction.person = asignee;
									let newHolder = factory.newRelationship(this.NS, 'Person', res.locals.admin_id.toString());
									transaction.newHolder = newHolder;
									transaction.type = "deleted";
									if (req.body.metadata) {
										transaction.metadata = JSON.stringify(req.body.metadata);
									} else {
										transaction.metadata = "{}";
									}
									transaction.form = factory.newRelationship(this.NS, 'Form', req.body.formId);
									// Submitting the transaction
									this.bizNetworkConnection.submitTransaction(transaction).then((result) => {
										console.log(result);
										// Returning response
										res.status(200).json(responseMessage.SUCCESS.SUCCESS);
									});
								});
						}).catch((err) => {
							// Catching errors
							console.error(err.message);
							res.status(500).json(responseMessage.FAIL.SOMETHING_WRONG);
						});
					}).catch((err) => {
						// Catching errors
						console.error(err.message);
						res.status(500).json(responseMessage.FAIL.SOMETHING_WRONG);
					});
				}).catch((err) => {
					// Catching errors
					console.error(err.message);
					res.status(500).json(responseMessage.FAIL.SOMETHING_WRONG);
				});
		})
		.catch(err => {
			// Catching errors
			console.log(err);
			res.send({ 'success': false, 'message': err.message });
		});
};