const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bySchema = new Schema({
	user_id: {
		type: Schema.Types.ObjectId,
		ref: 'person',
		required: [true, 'user_id is required']
	},
	timestamp: {
		type: Date,
		default: Date.now()
	}
});

const commentSchema = new Schema({
	data: {
		type: Schema.Types.Mixed,
		trim: true,
		required: [true, 'comment data is required']
	},
	by: {
		type: [bySchema],
		required: [true, 'by data is ']
	}
},
{
	timestamps: true
});

module.exports = {
	default: mongoose.model('comment', commentSchema),
	secondary: bySchema
};