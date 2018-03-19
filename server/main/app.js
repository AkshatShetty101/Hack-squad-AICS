const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('config');
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

this.bizNetworkConnection = new BusinessNetworkConnection();
this.cardName = config.get('cardName');
this.businessNetworkIdentifier = 'tutorial-network.bna';

require('dotenv-safe').config(); // automatically configure environment variables from .env
require('./config/mongoDatabase')(); // Connection to Database

// global configs
global.async = require('async');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('morgan')('dev'));
// Routes
app.use('/', require(path.join(__dirname, 'src', 'routes', 'routes.js')));

app.listen(process.env.PORT, () => {
    console.log(`Application running on port ${process.env.PORT}`);
    // this.bizNetworkConnection.connect(this.cardName)
    //     .then((result) => {
    //         console.log(result);
    //         this.businessNetworkDefinition = result;
    //         this.bizNetworkConnection.getAssetRegistry('org.acme.mynetwork.Commodity')
    //             .then((result) => {
    //                 let factory = this.businessNetworkDefinition.getFactory();
    //                 console.log('\n-----------1----------\n')
    //                 this.titlesRegistry = result;

    //                 this.bizNetworkConnection.getParticipantRegistry('org.acme.mynetwork.Trader')
    //                     .then((registry) => {

    //                         registry.getAll().then((data) => {
    //                             console.log(data);
    //                             let ob = factory.newRelationship('org.acme.mynetwork', 'Trader', '4602');
    //                             owner = factory.newResource('org.acme.mynetwork', 'Commodity', '1234');
    //                             owner.description = "Test";
    //                             owner.quantity = 2;
    //                             owner.mainExchange = "exchange-string";
    //                             owner.owner = ob;

    //                             console.log(owner);

    //                             // this.titlesRegistry.add(owner).then((data) => {

    //                             console.log('\n-----------1.3----------\n')
    //                             console.log(data);

    //                             console.log('\n-----------1.7----------\n')
    //                             this.titlesRegistry.getAll().then((data) => {
    //                                 console.log('\n-----------2----------\n');
    //                                 console.log(data);
    //                                 let transaction = factory.newTransaction('org.acme.mynetwork', 'Trade');
    //                                 transaction.commodity = factory.newRelationship('org.acme.mynetwork', 'Commodity', data[0].$identifier);
    //                                 transaction.newOwner = factory.newRelationship('org.acme.mynetwork', 'Trader', '5334');
    //                                 console.log('\n-----------3----------\n');
    //                                 return this.bizNetworkConnection.submitTransaction(transaction);
    //                                 console.log('\n-----------4----------\n')
    //                             });
    //                         });

    //                         // });

    //                     });
    //             });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
});

module.exports = app;