const { schemaComposer } = require('graphql-compose');
const { composeWithMongoose } = require('graphql-compose-mongoose');
const Person = require('../../../models/person');

const customOptions = {};
const personTC = composeWithMongoose(Person, customOptions).removeField('password');

schemaComposer.rootQuery().addFields({
	userById: personTC.getResolver('findById'),
	userByIds: personTC.getResolver('findByIds'),
	userOne: personTC.getResolver('findOne'),
	userMany: personTC.getResolver('findMany'),
	userCount: personTC.getResolver('count')
});

module.exports = schemaComposer.buildSchema();