const { schemaComposer } = require('graphql-compose');
const { composeWithMongoose } = require('graphql-compose-mongoose');
const ReqForm = require('../../../models/request_form');

const customOptions = {};
const reqFormTC = composeWithMongoose(ReqForm, customOptions);

schemaComposer.rootQuery().addFields({
	reqFormById: reqFormTC.getResolver('findById'),
	reqFormByIds: reqFormTC.getResolver('findByIds'),
	reqFormOne: reqFormTC.getResolver('findOne'),
	reqFormMany: reqFormTC.getResolver('findMany'),
	reqFormCount: reqFormTC.getResolver('count')
});

schemaComposer.rootMutation().addFields({
	rejectRequest: reqFormTC.getResolver('removeById')
});

module.exports = schemaComposer.buildSchema();