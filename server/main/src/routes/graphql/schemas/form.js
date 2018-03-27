const { schemaComposer } = require('graphql-compose');
const { composeWithMongoose } = require('graphql-compose-mongoose');
const Form = require('../../../models/form');

const customOptions = {};
const formTC = composeWithMongoose(Form, customOptions);

formTC.addResolver({
	kind: 'query',
	name: 'findOwnQuery',
	type: [formTC],
	args: {
		limit: {
			type: 'Int',
			default: 20
		},
		skip: {
			type: 'Int',
			default: 0
		},
		sortBy: {
			type: 'String',
			enum: ['updatedAt', 'createdAt']
		},
		sort: {
			type: 'String',
			enum: ['ASC', 'DESC']
		},
		filter: formTC.getInputType()
	},
	resolve: require('../resolvers/form/findOwnQuery')
});

formTC.addResolver({
	kind: 'query',
	name: 'findOwnQuery',
	type: 'Json',
	resolve: require('../resolvers/form/countFormQuery')
});

schemaComposer.rootQuery().addFields({
	formById: formTC.getResolver('findById'),
	formOne: formTC.getResolver('findOne'),
	formMany: formTC.getResolver('findMany'),
	formOwn: formTC.getResolver('findOwnQuery'),
	formCount: formTC.getResolver('formCountQuery')
});

module.exports = schemaComposer.buildSchema();