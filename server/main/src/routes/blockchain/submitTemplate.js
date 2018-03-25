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
		console.log(this.cardName);
		this.bizNetworkConnection.connect(this.cardName)
			.then((result) => {
				this.businessNetworkDefinition = result;
				// Getting factory definitions
				let factory = this.businessNetworkDefinition.getFactory();
				// Loading form registry
				let asignee = factory.newRelationship(this.NS, 'Person', res.locals.user._id.toString());
				let ra = factory.newRelationship(this.NS, 'Person', res.locals.ra_id.toString());
				let template = factory.newRelationship(this.NS, 'Template', req.body.templateId);
				let transaction = factory.newTransaction(this.NS, 'TemplateEvent');
				transaction.person = asignee;
				transaction.newHolder = ra;
				transaction.type = 'template_submit';
				transaction.template = template;
				if (req.body.metadata) {
					transaction.metadata = JSON.stringify(req.body.metadata);
				} else {
					transaction.metadata = '{}';
				}
				this.bizNetworkConnection.submitTransaction(transaction).then(() => {
					// Returning response
					console.log('Template submit transaction added to blockchain');
					const notifToSend = notificationMessage.RA.ADMIN_SUB_TEMP;
					notifToSend.data = { templateId: req.body.templateId, causerId: res.locals.user._id.toString() };
					notificationsHelper.addNotificationToQueue(ra.locals.ra_id.toString(), notifToSend);
					res.status(200).json(responseMessage.SUCCESS.SUCCESS);
				}).catch((err) => {
					// Catching errors
					console.error(err);
					res.status(500).json(responseMessage.FAIL.SOMETHING_WRONG);
				});
			})
			.catch(err => {
				// Catching errors
				console.error(err);
				res.status(500).json(responseMessage.FAIL.SOMETHING_WRONG);
			});
	};