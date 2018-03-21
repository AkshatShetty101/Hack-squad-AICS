const { schemaComposer } = require('graphql-compose');
const { composeWithMongoose } = require('graphql-compose-mongoose');
const Form = require('../../../models/form');

const customOptions = {};
const formTC = composeWithMongoose(Form, customOptions);

schemaComposer.rootQuery().addFields({
	formById: formTC.getResolver('findById'),
	formByIds: formTC.getResolver('findByIds'),
	formOne: formTC.getResolver('findOne'),
	formMany: formTC.getResolver('findMany'),
	formCount: formTC.getResolver('count')
});

module.exports = schemaComposer.buildSchema();