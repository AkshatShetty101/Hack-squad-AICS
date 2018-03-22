const { schemaComposer } = require('graphql-compose');
const { composeWithMongoose } = require('graphql-compose-mongoose');
const Form = require('../../../models/form');

const customOptions = {};
const formTC = composeWithMongoose(Form, customOptions);

formTC.addResolver({
	kind: 'query',
	name: 'findOwn',
	type: [formTC],
	args: {
		limit: {
			type: 'Int',
			default: 20
		},
		_id: {
			type: 'Boolean',
			default: false
		}
	},
	resolve: require('../resolvers/form/findOwn')
});

schemaComposer.rootQuery().addFields({
	formById: formTC.getResolver('findById'),
	formOne: formTC.getResolver('findOne'),
	formMany: formTC.getResolver('findMany'),
	formOwn: formTC.getResolver('findOwn')
});

module.exports = schemaComposer.buildSchema();