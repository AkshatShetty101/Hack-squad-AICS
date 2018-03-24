const { schemaComposer } = require('graphql-compose');
const { composeWithMongoose } = require('graphql-compose-mongoose');
const Template = require('../../../models/template');

const customOptions = {};
const templateTC = composeWithMongoose(Template, customOptions);

templateTC.addResolver({
	kind: 'query',
	name: 'findOwnQuery',
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
	resolve: require('../resolvers/template/findOwnQuery')
});

schemaComposer.rootQuery().addFields({
	templateById: templateTC.getResolver('findById'),
	templateByIds: templateTC.getResolver('findByIds'),
	templateOne: templateTC.getResolver('findOne'),
	templateMany: templateTC.getResolver('findMany'),
	templateCount: templateTC.getResolver('count'),
	templateOwn: templateTC.getResolver('findOwnQuery')
});

module.exports = schemaComposer.buildSchema();