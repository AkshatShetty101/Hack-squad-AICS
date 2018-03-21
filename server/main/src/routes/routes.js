const express = require('express');
const router = express.Router();
const graphQLHTTP = require('express-graphql');
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
	verifyMiddleware.verifyPerson,
	verifyMiddleware.verifyAdmin,
	require('./templates/addTemplate'),
	require('./blockchain/addTemplate'),
	require('./forms/addForm'),
	require('./blockchain/addForm'));

router.post('/templates/edit',
	verifyMiddleware.verifyPerson,
	verifyMiddleware.verifyAdmin,
	require('./templates/editTemplate'),
	require('./blockchain/editTemplate'));

router.post('/templates/delete',
	verifyMiddleware.verifyPerson,
	verifyMiddleware.verifyAdmin,
	require('./templates/deleteTemplate'),
	require('./blockchain/deleteTemplate'));
/**
 * Form Routes
 */
router.post('/forms/edit',
	verifyMiddleware.verifyPerson,
	verifyMiddleware.verifyAdmin,
	require('./forms/editForm'),
	require('./blockchain/editForm'));

router.post('/forms/delete',
	verifyMiddleware.verifyPerson,
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

/**
 * GraphQL Query
 */
router.all('/api/graphql', graphQLHTTP((req, res) => ({ // to be replaced by router.post
	schema: require('./src/graphql/index'),
	context: { req, res },
	graphiql: process.env.NODE_ENV !== 'production'
})));

module.exports = router;
