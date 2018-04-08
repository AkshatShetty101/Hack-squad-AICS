const { schemaComposer } = require('graphql-compose');
const { composeWithMongoose, convertSchemaToGraphQL } = require('graphql-compose-mongoose');
const { default: Chat,
	secondary: Participant1Schema,
	tertiary: Participant2Schema
} = require('../../../models/chat');

const customOptions = {};
const chatTC = composeWithMongoose(Chat, customOptions);

convertSchemaToGraphQL(Participant1Schema, 'participant1Data', schemaComposer);
convertSchemaToGraphQL(Participant2Schema, 'participant2Data', schemaComposer);

schemaComposer.rootQuery().addFields({
});

module.exports = schemaComposer.buildSchema();