/*eslint-disable*/
// Declaring constants
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const config = require('config');
const notificationsHelper = require('../../utils/notificationsHelper');
const mailerHelper = require('../../utils/mailerHelper');

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
			console.log("In!");
			this.businessNetworkDefinition = result;
			// Getting factory definitions
			let factory = this.businessNetworkDefinition.getFactory();
			// Loading form registry
			this.bizNetworkConnection.getAssetRegistry(this.NS_T)
				.then((templateRegistry) => {
					templateRegistry.get(req.body.templateId).then((data) => {
						data.isValid = false;
						templateRegistry.update(data).then(() => {
							this.bizNetworkConnection.getParticipantRegistry(this.NS_P)
								.then((personRegistry) => {
									let asignee = factory.newRelationship(this.NS, 'Person', res.locals.user._id.toString());
									let transaction = factory.newTransaction(this.NS, 'TemplateEvent');
									transaction.person = asignee;
									transaction.newHolder = asignee;
									transaction.type = "template_delete";
									if (req.body.metadata) {
										transaction.metadata = JSON.stringify(req.body.metadata);
									} else {
										transaction.metadata = "{}";
									}
									transaction.template = factory.newRelationship(this.NS, 'Template', req.body.templateId);
									// Submitting the transaction
									this.bizNetworkConnection.submitTransaction(transaction).then((result) => {
										console.log(result);
										// Returning response
										const notifToSend = notificationMessage.RA.ADMIN_DEL_TEMP;
										notifToSend.data = { templateId: req.body.templateId.toString(), causerId: res.locals.user._id.toString() };
										notificationsHelper.addNotificationToQueue(res.locals.ra_id.toString(), notifToSend);
										let mailToSend = mailerHelper.mailData(`
										Hrithik Chauhan <hrithikchauhan@meity.gov.in>`, // Random name & email <- RA
										'An incomplete template for your request has been deleted', '',
										`Hey <b>Hrithik</b>,<br/>
										<br/>
										<p>An incomplete template for your request has been deleted. Please make a new request. Template_Id: <i>${req.body.templateId.toString()}</i></p>
										<br/>
										Thanks,<br/>
										AICS MeitY Team`);
										mailerHelper.sendMail(mailToSend);
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
			console.error(err.message);
			res.status(500).json(responseMessage.FAIL.SOMETHING_WRONG);
		});
};