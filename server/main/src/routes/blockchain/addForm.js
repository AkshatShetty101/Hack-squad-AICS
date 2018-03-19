const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const config = require('config');

// Declaring block-chain related information 
this.bizNetworkConnection = new BusinessNetworkConnection();
this.cardName = config.get('cardName');
this.businessNetworkIdentifier = 'aics.bna';
this.NS = config.get('NS');
this.NS_F = config.get('NS_F');
this.NS_P = config.get('NS_P');

module.exports = (req, res, next) => {
    //Establishing connection
    this.bizNetworkConnection.connect(this.cardName)
        .then((result) => {
            this.businessNetworkDefinition = result;
            let factory = this.businessNetworkDefinition.getFactory();
            this.bizNetworkConnection.getParticipantRegistry(this.NS_P)
                .then((personRegistry) => {
                    console.log(req.body);
                    personRegistry.exists(req.body.personId).then((persons) => {
                        this.bizNetworkConnection.getAssetRegistry(this.NS_F)
                            .then((formRegistry) => {
                                let asignee = factory.newRelationship(this.NS, 'Person', req.body.personId);
                                form = factory.newResource(this.NS, 'Form', req.body.formId);
                                form.assigneeId = [asignee];
                                form.isValid = true;
                                formRegistry.add(form).then((data) => {
                                    let transaction = factory.newTransaction(this.NS,'Event');
                                    transaction.person=ob;
                                    transaction.type="template_created";
                                    if(req.body.metadata)
                                    transaction.metadata=JSON.stringify(req.body.metadata);
                                    else
                                    transaction.metadata="{}";
                                    transaction.form = factory.newRelationship(this.NS, 'Form', req.body.formId);
                                    this.bizNetworkConnection.submitTransaction(transaction).then((result)=>{
                                        console.log(result);
                                        res.json({ "status": 1, "message": "Form Added successfully" });
                                    });
                                }).catch((err) => {
                                    console.log(err.message);
                                    res.send({ "status": -1, "message": err.message });
                                });
                            }).catch((err) => {
                                console.log(err.message);
                                res.send({ "status": -1, "message": err.message });
                            });
                    }).catch((err) => {
                        console.log(err.message);
                        res.send({ "status": -1, "message": err.message });
                    });
                });
        })
        .catch(err => {
            console.log(err);
        });
}