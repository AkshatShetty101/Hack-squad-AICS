const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const divisionSchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: [true, 'Name of division is required'],
		trim: true
	},
	gc_id: {
		type: Schema.Types.ObjectId,
		ref: 'person'
	},
	user_id: {
		type: [Schema.Types.ObjectId],
		ref: 'person',
		default: []
	},
	tags: {
		type: [String],
		default: []
	},
	type: {
		type: String,
		lowercase: true,
		trim: true,
		enum: ['division', 'organisation', 'group'],
		required: [true, 'division type is required']
	}
});

module.exports = mongoose.model('division', divisionSchema);