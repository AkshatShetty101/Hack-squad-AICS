/*eslint-disable*/

const Person = require('../src/models/person');

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

Person.find({}, { _id: 1, designation: 1 })
	.exec((err, docs) => {
		docs.forEach((doc) => {
			this.bizNetworkConnection.connect(this.cardName)
				.then((result) => {
					this.businessNetworkDefinition = result;
					// Getting factory definitions
					// Loading participant registry
					this.bizNetworkConnection.getParticipantRegistry(NS_P)
						.then((PersonRegistry) => {
							console.log('REached here!');
							console.log(doc._id);
							console.log(doc.designation);
							// Creating a new participant person
							let factory = this.businessNetworkDefinition.getFactory();
							let person = factory.newResource(NS, 'Person', doc._id.toString());
							person.designation = doc.designation;
							console.log('here!');
							// Adding form to form registry
							PersonRegistry.add(person).then(() => {
								// Returning response
								console.log(res.locals.designation + ' added successfully');
								res.status(200).json(responseMessage.SUCCESS.SUCCESS);
							}).catch((err) => {
								// Catching errors
								console.error(err.message);
								res.status(500).json(responseMessage.FAIL.SOMETHING_WRONG);
							});
						}).catch(err => {
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
		});
	});