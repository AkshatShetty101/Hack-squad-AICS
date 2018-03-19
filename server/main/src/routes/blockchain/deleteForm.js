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
						// formRegistry.remove(data).then(() => {
						// 	console.log("In!");
						// 	res.send({ success: true, message: "Deleted Successfully" });
						// }).catch((err) => {
						// 	// Catching errors
						// 	console.log(err.message);
						// 	res.send({ 'success': false, 'message': err.message });
						// });
						formRegistry.update(data).then(() => {
							this.bizNetworkConnection.getParticipantRegistry(this.NS_P)
								.then((personRegistry) => {
									let asignee = factory.newRelationship(this.NS, 'Person', req.body.personId);
									let transaction = factory.newTransaction(this.NS, 'Event');
									transaction.person = asignee;
									transaction.type = "deleted";
									if (req.body.metadata)
										transaction.metadata = JSON.stringify(req.body.metadata);
									else
										transaction.metadata = "{}";
									transaction.form = factory.newRelationship(this.NS, 'Form', req.body.formId);
									// Submitting the transaction
									this.bizNetworkConnection.submitTransaction(transaction).then((result) => {
										console.log(result);
										// Returning response
										res.json({ 'success': true, 'message': 'Form Deleted successfully' });
									});
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
					res.send({ 'success': false, 'message': err.message });
				});
		})
		.catch(err => {
			// Catching errors
			console.log(err);
			res.send({ 'success': false, 'message': err.message });
		});
};