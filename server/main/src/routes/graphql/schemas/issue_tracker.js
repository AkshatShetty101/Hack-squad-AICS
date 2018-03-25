const { schemaComposer } = require('graphql-compose');
const { composeWithMongoose } = require('graphql-compose-mongoose');
const IssueTracker = require('../../../models/issue_tracker').default;

const customOptions = {};
const issueTrackerTC = composeWithMongoose(IssueTracker, customOptions);

schemaComposer.rootQuery().addFields({
	issueTrackerById: issueTrackerTC.getResolver('findById'),
	issueTrackerOne: issueTrackerTC.getResolver('findOne'),
	issueTrackerCount: issueTrackerTC.getResolver('count')
});

module.exports = schemaComposer.buildSchema();