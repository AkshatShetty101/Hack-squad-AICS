const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestingAuthoritySchema = new Schema({
	ra_id: {
		type: String,
		unique: true,
		required: [true, 'RA id is required']
	},
	email: {
		type: String,
		unique: true,
		required: [true, 'Email is required']
	},
	password: {
		salt: String,
		hash: String
	},
	form_id: [Schema.Types.ObjectId]
},
{
	timestamps: true
});

module.exports = mongoose.model('requestingAuthority', requestingAuthoritySchema);