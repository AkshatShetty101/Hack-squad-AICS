const { schemaComposer } = require('graphql-compose');
const { composeWithMongoose } = require('graphql-compose-mongoose');
const ReqForm = require('../../../models/request_form');

const customOptions = {};
const reqFormTC = composeWithMongoose(ReqForm, customOptions);

reqFormTC.addResolver({
	kind: 'query',
	name: 'reqFormOwn',
	args: {
		limit: {
			type: 'Int',
			default: 20
		},
		skip: 'Int',
		sortBy: {
			type: 'String',
			enum: ['updatedAt', 'createdAt']
		},
		sort: {
			type: 'String',
			enum: ['ASC', 'DESC']
		},
		filter: reqFormTC.getInputType()
	},
	type: [reqFormTC],
	resolve: require('../resolvers/requestForm/requestFormQuery')
});

schemaComposer.rootQuery().addFields({
	reqFormById: reqFormTC.getResolver('findById'),
	reqFormByIds: reqFormTC.getResolver('findByIds'),
	reqFormOne: reqFormTC.getResolver('findOne'),
	reqFormMany: reqFormTC.getResolver('findMany'),
	reqFormCount: reqFormTC.getResolver('count'),
	reqFormOwn: reqFormTC.getResolver('reqFormOwn')
});

schemaComposer.rootMutation().addFields({
	rejectRequest: reqFormTC.getResolver('removeById')
});

module.exports = schemaComposer.buildSchema();