const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const config = require('config');

this.bizNetworkConnection = new BusinessNetworkConnection();
this.cardName = config.get('cardName');
this.businessNetworkIdentifier = 'aics.bna';

module.exports = (req, res, next) => {
    this.bizNetworkConnection.connect(this.cardName)
        .then((result) => {
            this.businessNetworkDefinition = result;
            let factory = this.businessNetworkDefinition.getFactory();
            this.bizNetworkConnection.getParticipantRegistry('org.acme.aics.Person')
                .then((PersonRegistry) => {
                    console.log(req.body);
                    person = factory.newResource('org.acme.aics', 'Person', req.body.personId);
                    person.designation = req.body.designation;
                    PersonRegistry.add(person).then((data) => {
                        res.send({"status":1,"message":req.body.designation+" added successfully"});
                    }).catch((err)=>{
                        console.log(err.message);
                        res.send({"status":-1,"message":err.message});
                    });
                });
        })
        .catch(err => {
            console.log(err);
        });
}