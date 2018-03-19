const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
	participant1: {
		user_id: {
			type: Schema.Types.ObjectId,
			ref: 'person',
			required: [true, 'user_id is required']
		},
		timestamp: {
			type: Date,
			default: Date.now(),
			required: [true, 'timestamp is required']
		},
		message: {
			type: String,
			trim: true,
			required: [true, 'message is required']
		}
	},
	participant2: {
		user_id: {
			type: Schema.Types.ObjectId,
			ref: 'person',
			required: [true, 'user_id is required']
		},
		timestamp: {
			type: Date,
			default: Date.now(),
			required: [true, 'timestamp is required']
		},
		message: {
			type: String,
			trim: true,
			required: [true, 'message is required']
		}
	}
},
{
	timestamps: true
});

module.exports = mongoose.model('chat', chatSchema);