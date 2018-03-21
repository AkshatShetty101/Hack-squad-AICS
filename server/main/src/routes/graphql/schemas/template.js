const { schemaComposer } = require('graphql-compose');
const { composeWithMongoose } = require('graphql-compose-mongoose');
const Template = require('../../../models/template');

const customOptions = {};
const templateTC = composeWithMongoose(Template, customOptions);

schemaComposer.rootQuery().addFields({
	templateById: templateTC.getResolver('findById'),
	templateByIds: templateTC.getResolver('findByIds'),
	templateOne: templateTC.getResolver('findOne'),
	templateMany: templateTC.getResolver('findMany'),
	templateCount: templateTC.getResolver('count')
});

module.exports = schemaComposer.buildSchema();