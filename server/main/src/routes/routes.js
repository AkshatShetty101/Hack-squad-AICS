const express = require('express');
const router = express.Router();
const verifyMiddleware = require('../utils/verifyMiddleware');

router.all('/', function (req, res) {
	res.json({ success: true });
});


/**
 * Person Routes
 */
router.post('/users/register',
	verifyMiddleware.verifySystemAdmin,
	require('./person/registerPerson'),
	require('./blockchain/addPerson'));

router.post('/users/login',
	require('./person/loginPerson'));

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
 * Template Routes
 */
router.post('/templates/add',
	verifyMiddleware.verifyAdmin,
	require('./templates/addTemplate'),
	require('./forms/addForm'),
	require('./blockchain/addForm'));

router.post('/templates/edit',
	verifyMiddleware.verifyAdmin,
	require('./templates/editTemplate'));
// require('./blockchain/editTempalte'));

/**
 * Form Routes
 */
router.post('/forms/delete',
	verifyMiddleware.verifyAdmin,
	require('./forms/deleteForm'),
	require('./blockchain/deleteForm'));

/**
 * Requesting Authority Routes
 */
router.post('/reqAuth/add',
	verifyMiddleware.verifySystemAdmin,
	require('./requestingAuth/addReqestingAuth'));
router.post('/reqAuth/remove',
	verifyMiddleware.verifySystemAdmin,
	require('./requestingAuth/removeRequestingAuth'));
router.post('./reqAuth/edit',
	verifyMiddleware.verifyRequestingAuthority,
	require('./requestingAuth/editRequestingAuthForm'));

/**
 * System Admin Routes
 */
router.post('/systemAdmin/add',
	require('./systemAdmin/addSystemAdmin'));

router.post('/systemAdmin/login',
	require('./systemAdmin/loginSystemAdmin'));

router.post('/users/delete',
	verifyMiddleware.verifySystemAdmin,
	require('./person/deletePerson'),
	require('./blockchain/deletePerson'));

router.post('/divisions/add',
	verifyMiddleware.verifySystemAdmin,
	require('./divisions/addDivision'));

module.exports = router;
