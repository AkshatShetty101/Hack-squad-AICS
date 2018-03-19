// Declaring constants
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const config = require('config');

// Declaring block-chain related information 
this.bizNetworkConnection = new BusinessNetworkConnection();
this.cardName = config.get('cardName');
this.businessNetworkIdentifier = config.get('bna');;

module.exports = (req, res, next) => {
    // Establishing connection
    this.bizNetworkConnection.connect(this.cardName)
        .then((result) => {
            this.businessNetworkDefinition = result;
            // Getting factory definitions
            let factory = this.businessNetworkDefinition.getFactory();
            // Loading participant registry
            this.bizNetworkConnection.getParticipantRegistry('org.acme.aics.Person')
                .then((PersonRegistry) => {
                    console.log(req.body);
                    // Creating a new participant person
                    person = factory.newResource('org.acme.aics', 'Person', req.body.personId);
                    person.designation = req.body.designation;
                    // Adding form to form registry
                    PersonRegistry.add(person).then((data) => {
                        // Returning response
                        res.send({ "status": 1, "message": req.body.designation + " added successfully" });
                    }).catch((err) => {
                        // Catching errors
                        console.log(err.message);
                        res.send({ "status": -1, "message": err.message });
                    });
                });
        })
        .catch(err => {
            // Catching errors
            console.log(err);
            res.send({ "status": -1, "message": err.message });
        });
}