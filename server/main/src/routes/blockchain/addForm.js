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

module.exports = (req, res, next) => {
    // Establishing connection
    this.bizNetworkConnection.connect(this.cardName)
        .then((result) => {
            this.businessNetworkDefinition = result;
            // Getting factory definitions
            let factory = this.businessNetworkDefinition.getFactory();
            // Loading participant registry
            this.bizNetworkConnection.getParticipantRegistry(this.NS_P)
                .then((personRegistry) => {
                    console.log(req.body);
                    // Verifying if person exists
                    personRegistry.exists(req.body.personId).then((persons) => {
                        // Loading the form registry
                        this.bizNetworkConnection.getAssetRegistry(this.NS_F)
                            .then((formRegistry) => {
                                // Creating relationship for person
                                let asignee = factory.newRelationship(this.NS, 'Person', req.body.personId);
                                // Creating a new form asset
                                form = factory.newResource(this.NS, 'Form', req.body.formId);
                                form.assigneeId = [asignee];
                                form.isValid = true;
                                // Adding form to form registry
                                formRegistry.add(form).then((data) => {
                                    // Creating the transaction
                                    let transaction = factory.newTransaction(this.NS, 'Event');
                                    transaction.person = ob;
                                    transaction.type = "template_created";
                                    if (req.body.metadata)
                                        transaction.metadata = JSON.stringify(req.body.metadata);
                                    else
                                        transaction.metadata = "{}";
                                    transaction.form = factory.newRelationship(this.NS, 'Form', req.body.formId);
                                    // Submitting the transaction
                                    this.bizNetworkConnection.submitTransaction(transaction).then((result) => {
                                        console.log(result);
                                        // Returning response
                                        res.json({ "status": 1, "message": "Form Added successfully" });
                                    });
                                }).catch((err) => {
                                    // Catching errors
                                    console.log(err.message);
                                    res.send({ "status": -1, "message": err.message });
                                });
                            }).catch((err) => {
                                // Catching errors
                                console.log(err.message);
                                res.send({ "status": -1, "message": err.message });
                            });
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