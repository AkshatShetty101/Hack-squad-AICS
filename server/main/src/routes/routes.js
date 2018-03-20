const express = require('express');
const router = express.Router();
const verifyMiddleware = require('../utils/verifyMiddleware');

router.all('/', function (req, res) {
	res.json({ success: true });
});

/**
 * User routes
 */
router.post('/users/loginPerson',
	require('./person/loginPerson'));

router.post('/users/registerPerson',
	verifyMiddleware.verifySystemAdmin,
	require('./person/registerPerson'));
	// require('./blockchain/addPerson'));

router.post('/users/getId',
	require('./person/getId'));

router.post('/users/getPeopleByDivision',
	require('./person/getPeopleByDivision'));

router.post('/users/getPeopleByDesignation',
	require('./person/getPeopleByDesignation'));

router.post('/users/deletePerson',
	require('./person/deletePerson'),
	require('./blockchain/deletePerson'));

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
 * System Admin Routes
 */
router.post('/systemAdmin/add',
	require('./systemAdmin/addSystemAdmin'));
router.post('/systemAdmin/login',
	require('./systemAdmin/loginSystemAdmin'));

module.exports = router;
