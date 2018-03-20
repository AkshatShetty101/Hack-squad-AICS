var express = require('express');
var router = express.Router();

router.all('/', function (req, res) {
	console.log(res.body);
	res.json({ success: true });
});


router.post('/users/registerPerson',
	require('./users/registerPerson'),
	require('./blockchain/addPerson'));

	router.post('/divisions/addDivision',
	require('./divisions/addDivision'));

	router.post('/templates/addTemplateAndForm',
	require('./templates/addTemplate'),
	require('./forms/addForm'),
	require('./blockchain/addForm'));

	router.post('/templates/editTemplate',
	require('./templates/editTemplate'),
	require('./blockchain/editTempalte'));

	router.post('/forms/deleteForm',
	require('./forms/deleteForm'),
	require('./blockchain/deleteForm'));

module.exports = router;
