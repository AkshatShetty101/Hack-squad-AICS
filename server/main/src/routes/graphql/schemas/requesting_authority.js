const { schemaComposer } = require('graphql-compose');
const { composeWithMongoose } = require('graphql-compose-mongoose');
const { default: ReqAuth } = require('../../../models/requesting_authority');

const customOptions = {};
const reqAuthTC = composeWithMongoose(ReqAuth, customOptions).removeField('password');

reqAuthTC.addResolver({
	kind: 'query',
	name: 'requestForm',
	args: {
		limit: {
			type: 'Int',
			default: 20
		},
		skip: 'Int'
	},
	type: [reqAuthTC],
	resolve: require('../resolvers/requesting_authority/requestForm')
});

schemaComposer.rootQuery().addFields({
	raRequestForm: reqAuthTC.getResolver('requestForm')
});

module.exports = schemaComposer.buildSchema();