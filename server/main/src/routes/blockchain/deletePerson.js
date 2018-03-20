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
			this.bizNetworkConnection.getParticipantRegistry(this.NS_P)
				.then((personRegistry) => {
					personRegistry.get(req.body.personId)
						.then((data) => {
							personRegistry.remove(data)
								.then(() => {
									console.log("In!");
									res.send({ success: true, message: "Deleted Person Successfully" });
								}).catch((err) => {
									// Catching errors
									console.log(err.message);
									res.send({ 'success': false, 'message': err.message });
								});
						}).catch(err => {
							// Catching errors
							console.log(err);
							res.send({ 'success': false, 'message': err.message });
						});
				});
		})
		.catch(err => {
			// Catching errors
			console.log(err);
			res.send({ 'success': false, 'message': err.message });
		});
};