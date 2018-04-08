const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const systemAdminSchema = new Schema({
	username: {
		type: String,
		unique: true,
		trim: true,
		required: [true, 'username is required']
	},
	password: {
		type: String,
		required: [true, 'password is required']
	},
});

module.exports = mongoose.model('systemAdmin', systemAdminSchema);