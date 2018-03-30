const { schemaComposer } = require('graphql-compose');
const { composeWithMongoose } = require('graphql-compose-mongoose');
// const ReqForm = require('../../../models/request_form');

const customOptions = {};
// const reqFormTC = composeWithMongoose(ReqForm, customOptions);


// schemaComposer.rootQuery().addFields({
// 	requestForm: reqFormTC.getResolver('requestForm')
// });

// module.exports = schemaComposer.buildSchema();