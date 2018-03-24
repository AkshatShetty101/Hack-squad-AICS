const { schemaComposer } = require('graphql-compose');
const { composeWithMongoose } = require('graphql-compose-mongoose');
const IssueTracker = require('../../../models/issue_tracker').default;

const customOptions = {};
const issueTrackerTC = composeWithMongoose(IssueTracker, customOptions);

issueTrackerTC.addResolver({
	kind: 'mutation',
	name: 'createOwn',
	type: issueTrackerTC.getType(),
	args: {
		record: issueTrackerTC.getInputType()
	},
	resolve: require('../resolvers/issueTracker/createOwn')
});

schemaComposer.rootQuery().addFields({
	issueTrackerById: issueTrackerTC.getResolver('findById'),
	issueTrackerOne: issueTrackerTC.getResolver('findOne'),
	issueTrackerCount: issueTrackerTC.getResolver('count')
});

schemaComposer.rootMutation().addFields({
	issueTrackerCreate: issueTrackerTC.getResolver('createOwn'),
	issueTrackerUpdate: issueTrackerTC.getResolver('updateOwn')
});

module.exports = schemaComposer.buildSchema();