const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
	comment_id: {
		type: String,
		unique: true,
		required: [true, 'comment_id is required']
	},
	data: {
		type: Schema.Types.Mixed,
		trim: true,
		required: [true, 'comment data is required']
	},
	by: [{
		user_id: {
			type: Schema.Types.ObjectId,
			ref: 'person',
			required: [true, 'user_id is required']
		},
		timestamp: {
			type: Date,
			default: Date.now()
		}
	}]
},
{
	timestamps: true
});

module.exports = mongoose.model('comment', commentSchema);