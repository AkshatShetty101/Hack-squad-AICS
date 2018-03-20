var express = require('express');
var router = express.Router();

router.all('/', function (req, res) {
	res.json({ success: true });
});


router.post('/users/registerPerson',
	require('./person/registerPerson'),
	require('./blockchain/addPerson'));

router.post('/users/getId',
	require('./person/getId'));

router.post('/users/getPeopleByDivision',
	require('./person/getPeopleByDivision'));

router.post('/users/getPeopleByDesignation',
	require('./person/getPeopleByDesignation'));

router.post('/users/deletePerson',
	require('./person/deletePerson'));

router.post('/divisions/addDivision',
	require('./divisions/addDivision'));

router.post('/templates/addTemplateAndForm',
	require('./templates/addTemplate'),
	require('./forms/addForm'),
	require('./blockchain/addForm'));

router.post('/templates/editTemplate',
	require('./templates/editTemplate'));
	// require('./blockchain/editTempalte'));

router.post('/forms/deleteForm',
	require('./forms/deleteForm'),
	require('./blockchain/deleteForm'));

/**
 * Admin Routes
 */
router.post('/systemAdmin/add',
	require('./systemAdmin/addSystemAdmin'));

module.exports = router;
