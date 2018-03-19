const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const systemAdminSchema = new Schema({
	admin_id: {
		type: String,
		unique: true,
		required: [true, 'admin_id is required!']
	},
	username: {
		type: String,
		unique: true,
		trim: true,
		required: [true, 'username is required']
	},
	password: {
		salt: String,
		hash: String
	}
});

module.exports = mongoose.model('systemAdmin', systemAdminSchema);