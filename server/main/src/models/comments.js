const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
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