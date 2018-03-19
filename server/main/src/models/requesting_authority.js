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
	form_id: [Schema.Types.ObjectId]
},
{
	timestamps: true
});

module.exports = mongoose.model('requestingAuthority', requestingAuthoritySchema);