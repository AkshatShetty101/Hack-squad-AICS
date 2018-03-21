const { schemaComposer } = require('graphql-compose');
const { composeWithMongoose } = require('graphql-compose-mongoose');
const Division = require('../../../models/division');

const customOptions = {};
const divisionTC = composeWithMongoose(Division, customOptions);

schemaComposer.rootQuery().addFields({
	divisionById: divisionTC.getResolver('findById'),
	divisionByIds: divisionTC.getResolver('findByIds'),
	divisionOne: divisionTC.getResolver('findOne'),
	divisionMany: divisionTC.getResolver('findMany'),
	divisionCount: divisionTC.getResolver('count')
});

module.exports = schemaComposer.buildSchema();