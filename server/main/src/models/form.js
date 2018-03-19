const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formSchema = new Schema({
	form_id: {
		type: String,
		unique: true,
		required: [true, 'form_id is required']
	},
	template_id: {
		type: Schema.Types.ObjectId,
		ref: 'template',
		required: [true, 'template_id is required']
	},
	created_by: {
		type: Schema.Types.ObjectId,
		ref: 'person',
		required: [true, 'created_by user_id is required']
	},
	is_completed: {
		type: Boolean,
		default: false
	},
	assigned_to: {
		type: Schema.Types.ObjectId,
		ref: 'person',
		required: [true, 'assigned_to is required']
	},
	data: {
		type: Schema.Types.Mixed,
		trim: true
	}
},
{
	timestamps: true
});

module.exports = mongoose.model('form', formSchema);