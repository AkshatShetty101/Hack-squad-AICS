const { schemaComposer } = require('graphql-compose');
const { composeWithMongoose } = require('graphql-compose-mongoose');
const Person = require('../../../models/person');

const customOptions = {};
const personTC = composeWithMongoose(Person, customOptions).removeField('password');

/**
 * userOne (self: true) { ... } <- self data --v this logic is applied
 * userOne { ... } <- *1 if gc -> one user data of his division *2 -> if admin -> one gc data
 * userMany (self: true) { ... } <-- self data and all other data
 * userMany  ... } <-- all other data
 */

personTC.addResolver({
	kind: 'query',
	name: 'findOneQuery',
	args: {
		skip: 'Int',
		self: {
			type: 'Boolean',
			default: true
		}
	},
	type: personTC,
	resolve: require('../resolvers/person/findOneQuery')
});

personTC.addResolver({
	kind: 'query',
	name: 'findManyQuery',
	args: {
		limit: {
			type: 'Int',
			default: 20
		},
		skip: 'Int',
		self: {
			type: 'Boolean',
			default: true
		}
	},
	type: [personTC],
	resolve: require('../resolvers/person/findManyQuery')
});

schemaComposer.rootQuery().addFields({
	userOne: personTC.getResolver('findOneQuery'),
	userMany: personTC.getResolver('findManyQuery')
});

module.exports = schemaComposer.buildSchema();