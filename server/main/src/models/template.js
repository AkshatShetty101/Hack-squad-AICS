const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const templateSchema = new Schema({
	created_by: {
		type: Schema.Types.ObjectId,
		ref: 'person',
		unique: true,
		required: [true, 'created_by user_id is required']
	},
	tags: {
		type: [String],
		default: []
	},
	format: {
		type: Schema.Types.Mixed,
		trim: true
	}
},
{
	timestamps: true
});

module.exports = mongoose.model('template', templateSchema);