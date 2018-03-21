const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accessFormSchema = new Schema({
	metadata: {
		type: Schema.Types.Mixed,
		default: {}
	}
});

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
	access_form: [accessFormSchema]
},
{
	timestamps: true
});

module.exports = {
	default: mongoose.model('requestingAuthority', requestingAuthoritySchema),
	secondary: accessFormSchema
};