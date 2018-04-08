const mongoose = require('mongoose');

module.exports = () => {
	mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/aics');

	const db = mongoose.connection;

	db.on('error', console.error.bind(console, 'Connection Error:'));
	db.once('open', () => {
		console.log("Connected to Database!");
	});
};