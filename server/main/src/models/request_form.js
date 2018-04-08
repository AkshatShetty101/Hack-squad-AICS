const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestFormSchema = new Schema({
	admin_id: { // only admin
		type: Schema.Types.ObjectId,
		ref: 'person',
		required: [true, 'admin_id is required']
	},
	ra_id: { // only ra
		type: Schema.Types.ObjectId,
		ref: 'requestingauthority',
		required: [true, 'ra_id is required']
	},
	data: { //requirements
		type: Schema.Types.Mixed,
		required: [true, 'data is required']
	},
	is_closed: {
		type: Boolean,
		default: false
	},
	template: {
		template_id: {
			type: Schema.Types.ObjectId,
			ref: 'template',
			// required: [true, 'template id is required']
		},
		is_approved: {
			type: Boolean,
			default: false
		}
	},
	form: {
		form_id: {
			type: Schema.Types.ObjectId,
			ref: 'form',
			// required: [true, 'form id is required']
		},
		is_approved: {
			type: Boolean,
			default: false
		}
	}
},
{
	timestamps: true
});

module.exports = mongoose.model('requestForm', requestFormSchema);