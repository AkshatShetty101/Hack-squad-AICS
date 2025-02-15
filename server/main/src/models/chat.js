const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Participant1Schema = new Schema({
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
}, { _id: false });

const Participant2Schema = new Schema({
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
}, { _id: false });

const chatSchema = new Schema({
	participant1: {
		type: [Participant1Schema],
		required: [true, 'Participant1 is required']
	},
	participant2: {
		type: [Participant2Schema],
		required: [true, 'Participant1 is required']
	}
},
{
	timestamps: true
});

module.exports = {
	default: mongoose.model('chat', chatSchema),
	secondary: Participant1Schema,
	tertiary: Participant2Schema
};