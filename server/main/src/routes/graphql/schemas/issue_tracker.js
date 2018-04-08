const { schemaComposer } = require('graphql-compose');
const { composeWithMongoose } = require('graphql-compose-mongoose');
const IssueTracker = require('../../../models/issue_tracker').default;

const customOptions = {};
const issueTrackerTC = composeWithMongoose(IssueTracker, customOptions);

issueTrackerTC.addResolver({
	kind: 'query',
	type: 'Int',
	name: 'commentCount',
	args: {
		_id: 'String'
	},
	resolve: require('../resolvers/issueTracker/commentCountQuery')
});

schemaComposer.rootQuery().addFields({
	issueTrackerById: issueTrackerTC.getResolver('findById'),
	issueTrackerOne: issueTrackerTC.getResolver('findOne'),
	issueTrackerCount: issueTrackerTC.getResolver('count'),
	issueTrackerCommentCount: issueTrackerTC.getResolver('commentCount')
});

module.exports = schemaComposer.buildSchema();