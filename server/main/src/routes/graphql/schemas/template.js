const { schemaComposer } = require('graphql-compose');
const { composeWithMongoose } = require('graphql-compose-mongoose');
const Template = require('../../../models/template');

const customOptions = {};
const templateTC = composeWithMongoose(Template, customOptions);

templateTC.addResolver({
	kind: 'query',
	name: 'findOwn',
	type: [templateTC],
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
	templateById: templateTC.getResolver('findById'),
	templateByIds: templateTC.getResolver('findByIds'),
	templateOne: templateTC.getResolver('findOne'),
	templateMany: templateTC.getResolver('findMany'),
	templateCount: templateTC.getResolver('count'),
	templateOwn: templateTC.getResolver('findOwn')
});

module.exports = schemaComposer.buildSchema();