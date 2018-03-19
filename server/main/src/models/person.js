const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
	name: {
		firstName: {
			type: String,
			required: [true, 'First Name is required'],
			trim: true
		},
		middleName: {
			type: String,
			trim: true
		},
		lastName: {
			type: String,
			required: [true, 'Last Name is required'],
			trim: true
		}
	},
	access_form_id: {
		type: [Schema.Types.ObjectId],
		ref: 'form'
	},
	password: {
		type: String,
		required: [true, 'password is required']
	},
	email: {
		type: String,
		unique: true,
		trim: true,
		required: [true, 'email_id is required']
	},
	division_id: {
		type: Schema.Types.ObjectId,
		ref: 'division',
		required: [true, 'division_id is required']
	},
	designation: {
		type: String,
		enum: ['admin', 'gc', 'user'],
		trim: true,
		required: [true, 'designation is required']
	}
},
{
	timestamps: true
});

module.exports = mongoose.model('person', personSchema);