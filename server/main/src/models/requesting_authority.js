const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestingAuthoritySchema = new Schema({
	email: {
		type: String,
		unique: true,
		trim: true,
		required: [true, 'Email is required']
	},
	password: {
		type: String,
		required: [true, 'password is required']
	},
	access_form: [{
		form_id: {
			type: Schema.Types.ObjectId,
			unique: true,
			trim: true,
			required: [true, 'Form id is required']
		},
		metadata: {
			type: Schema.Types.Mixed,
			default: {}
		}
	}]
},
{
	timestamps: true
});

module.exports = mongoose.model('requestingAuthority', requestingAuthoritySchema);