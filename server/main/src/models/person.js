const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * This Schema is for a Person
 */
const personSchema = new Schema({
	user_id: {
		type: String,
		unique: true,
		required: [true, 'user_id is required']
	},
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
	password: String,
	email: {
		type: String,
		unique: true,
		trim: true,
		required: [true, 'Email Id is required']
	},
	division_id: {
		type: Schema.Types.ObjectId,
		ref: 'division',
		required: [true, 'division_id is required']
	},
	designation: {
		type: String,
		enum: ['admin', 'gc', 'user'],
		required: [true, 'designation is required']
	}
},
{
	timestamps: true
});

module.exports = mongoose.model('person', personSchema);