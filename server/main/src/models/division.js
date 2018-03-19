const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const divisionSchema = new Schema({
	division_id: {
		type: String,
		unique: true,
		required: [true, 'division_id is required']
	},
	name: {
		type: String,
		required: [true, 'Name of division is required'],
		trim: true
	},
	gc_id: {
		type: Schema.Types.ObjectId
	},
	user_id: [Schema.Types.ObjectId],
	tags: {
		type: [String],
		default: []
	},
	type: {
		type: String,
		lowercase: true,
		trim: true,
		enum: ['division', 'organization', 'group'],
		required: [true, 'division type is required']
	}
});

module.exports = mongoose.model('division', divisionSchema);