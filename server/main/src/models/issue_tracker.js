const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bySchema = new Schema({
	by: {
		type: Schema.Types.ObjectId,
		ref: 'person',
		required: [true, 'data by is required']
	},
	message: {
		type: Schema.Types.Mixed,
		required: [true, 'some message should be associated with data']
	},
	timestamp: {
		type: Date,
		default: Date.now(),
		required: [true, 'timestamp is required']
	}
});

const issueTrackerSchema = new Schema({
	heading: {
		title: {
			type: String,
			required: [true, 'Title is compulsory']
		},
		subtitle: {
			type: String
		},
		description: {
			type: String
		}
	},
	created_by: {
		type: Schema.Types.ObjectId,
		ref: 'person',
		required: [true, 'created_by user_id is required']
	},
	is_open: {
		type: Boolean,
		default: true
	},
	tags: {
		type: [String],
		enum: ['doubt', 'incorrect template', 'insufficient data'],
		default: []
	},
	data: [bySchema]
},
{
	timestamps: true
});

module.exports = {
	default: mongoose.model('issueTracker', issueTrackerSchema),
	secondary: bySchema
};