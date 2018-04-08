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
const notificationsHelper = require('../../utils/notificationsHelper');
const mailerHelper = require('../../utils/mailerHelper');

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
										console.log(assignee);
										console.log(template);
										form = factory.newResource(this.NS, 'Form', res.locals.formId.toString());
										form.createdBy = assignee;
										form.currentHolder = assignee;
										form.template = template;
										form.isCompleted = false;
										form.requestId = res.locals.requestId.toString();
										form.isValid = true;
										console.log(form)
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
												notifToSend.data = { formId: res.locals.formId.toString(), causerId: res.locals.user._id.toString() };
												notificationsHelper.addNotificationToQueue(res.locals.admin_id.toString(), notifToSend);
												let mailToSend = mailerHelper.mailData(`
												Rajesh Singhania <rajeshsinghania@meity.gov.in>`, // Random name & email <- Admin
												'A new form has to be assigned', '',
												`Hey <b>Rajesh</b>,<br/>
												<br/>
												<p>A new form has been created which has to be assigned. Form_Id: <i>${res.locals.formId.toString()}</i></p>
												<br/>
												Thanks,<br/>
												AICS MeitY Team`);
												mailerHelper.sendMail(mailToSend);
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