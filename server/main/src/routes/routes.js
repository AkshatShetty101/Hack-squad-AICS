const express = require('express');
const router = express.Router();
const verifyMiddleware = require('../utils/verifyMiddleware');

router.all('/', function (req, res) {
	res.json({ success: true });
});


/**
 * Person Routes
 */
router.post('/users/registerPerson',
	verifyMiddleware.verifySystemAdmin,
	require('./person/registerPerson'),
	require('./blockchain/addPerson'));

router.post('/users/getId',
	verifyMiddleware.verifyPerson,
	require('./person/getId'));

router.post('/users/getPeopleByDivision',
	verifyMiddleware.verifyPerson,
	require('./person/getPeopleByDivision'));

router.post('/users/getPeopleByDesignation',
	verifyMiddleware.verifyPerson,
	require('./person/getPeopleByDesignation'));

/**
 * Admin Routes
 */

router.post('/templates/addTemplateAndForm',
	verifyMiddleware.verifyAdmin,
	require('./templates/addTemplate'),
	require('./forms/addForm'),
	require('./blockchain/addForm'));

router.post('/templates/editTemplate',
	verifyMiddleware.verifyAdmin,
	require('./templates/editTemplate'));
// require('./blockchain/editTempalte'));

router.post('/forms/deleteForm',
	verifyMiddleware.verifyAdmin,
	require('./forms/deleteForm'),
	require('./blockchain/deleteForm'));

/**
 * System Admin Routes
 */
router.post('/systemAdmin/add',
	require('./systemAdmin/addSystemAdmin'));

router.post('/users/deletePerson',
	verifyMiddleware.verifySystemAdmin,
	require('./person/deletePerson'),
	require('./blockchain/deletePerson'));

router.post('/divisions/addDivision',
	verifyMiddleware.verifySystemAdmin,
	require('./divisions/addDivision'));

module.exports = router;
