/*eslint-disable*/
// Declaring constants
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const config = require('config');

// Declaring block-chain related information
this.bizNetworkConnection = new BusinessNetworkConnection();
this.cardName = config.get('cardName');
this.businessNetworkIdentifier = config.get('bna');
this.NS = config.get('NS');
this.NS_F = config.get('NS_F');
this.NS_T = config.get('NS_T');
this.NS_P = config.get('NS_P');

module.exports = (req, res) => {
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
						this.bizNetworkConnection.getAssetRegistry(this.NS_F)
							.then((formRegistry) => {
								this.bizNetworkConnection.getAssetRegistry(this.NS_T)
									.then((templateRegistry) => {
										// Creating relationship for person
										let assignee = factory.newRelationship(this.NS, 'Person', res.locals.user._id.toString());
										let template = factory.newRelationship(this.NS, 'Template', req.body.templateId.toString());
										// Creating a new form asset
										form = factory.newResource(this.NS, 'Form', res.locals.formId);
										form.createdBy = assignee;
										form.currentHolder = assignee;
										form.template = template;
										form.requestId = res.locals.requestId.toString();
										form.isValid = true;
										// Adding form to form registry
										formRegistry.add(form).then((data) => {
											// Creating the transaction
											let transaction = factory.newTransaction(this.NS, 'FormEvent');
											transaction.person = assignee;
											transaction.newHolder = assignee;
											transaction.type = "create";
											if (req.body.metadata) {
												transaction.metadata = JSON.stringify(req.body.metadata);
											} else {
												transaction.metadata = "{}";
											}
											transaction.form = factory.newRelationship(this.NS, 'Form', res.locals.formId);
											// Submitting the transaction
											this.bizNetworkConnection.submitTransaction(transaction).then((result) => {
												// Returning response
												console.log('Form Added successfully to block-chain');
												const notifToSend = notificationMessage.ADMIN.RA_APP_TEMP;
												notifToSend.data = { formId: res.locals.formId, causerId: res.locals.user._id.toString() };
												notificationsHelper.addNotificationToQueue(res.locals.admin_id, notifToSend);
												res.status(200).json(responseMessage.SUCCESS.SUCCESS);
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
					}).catch((err) => {
						// Catching errors
						console.error(err.message);
						res.status(500).json(responseMessage.FAIL.SOMETHING_WRONG);
					});
				});
		})
		.catch(err => {
			// Catching errors
			console.error(err.message);
			res.status(500).json(responseMessage.FAIL.SOMETHING_WRONG);
		});
}