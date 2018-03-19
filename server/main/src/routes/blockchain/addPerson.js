// Declaring constants
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const config = require('config');

// Declaring block-chain related information
this.bizNetworkConnection = new BusinessNetworkConnection();
this.cardName = config.get('cardName');
this.businessNetworkIdentifier = config.get('bna');
let NS = config.get('NS');
let NS_P = config.get('NS_P');

module.exports = (req, res) => {
	// Establishing connection
	this.bizNetworkConnection.connect(this.cardName)
		.then((result) => {
			this.businessNetworkDefinition = result;
			// Getting factory definitions
			// Loading participant registry
			this.bizNetworkConnection.getParticipantRegistry(NS_P)
				.then((PersonRegistry) => {
					console.log('REached here!');
					console.log(res.locals.personId);
					console.log(res.locals.designation);
					// Creating a new participant person
					let factory = this.businessNetworkDefinition.getFactory();
					let person = factory.newResource(NS, 'Person', res.locals.personId.toString());
					person.designation = res.locals.designation;
					console.log('here!');
					// Adding form to form registry
					PersonRegistry.add(person).then(() => {
						// Returning response
						res.send({ 'status': 1, 'message': res.locals.designation + ' added successfully' });
					}).catch((err) => {
						// Catching errors
						console.log(err.message);
						res.send({ 'status': -1, 'message': err.message });
					});
				}).catch(err => {
					// Catching errors
					console.log(err);
					res.send({ 'status': -1, 'message': err.message });
				});
		})
		.catch(err => {
			// Catching errors
			console.log(err);
			res.send({ 'status': -1, 'message': err.message });
		});
};