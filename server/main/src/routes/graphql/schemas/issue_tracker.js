const { schemaComposer } = require('graphql-compose');
const { composeWithMongoose } = require('graphql-compose-mongoose');
const IssueTracker = require('../../../models/issue_tracker');

const customOptions = {};
const issueTrackerTC = composeWithMongoose(IssueTracker, customOptions);

schemaComposer.rootQuery().addFields({
	issueTrackerById: issueTrackerTC.getResolver('findById'),
	issueTrackerByIds: issueTrackerTC.getResolver('findByIds'),
	issueTrackerOne: issueTrackerTC.getResolver('findOne'),
	issueTrackerMany: issueTrackerTC.getResolver('findMany'),
	issueTrackerCount: issueTrackerTC.getResolver('count')
});

module.exports = schemaComposer.buildSchema();