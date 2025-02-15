const express = require('express');
const router = express.Router();
const graphQLHTTP = require('express-graphql');
const verifyMiddleware = require('../utils/verifyMiddleware');
const queryMiddleware = require('./blockchain/query');

router.all('/', function (req, res) {
	res.json(responseMessage.SUCCESS.IT_WORKS);
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

router.post('/users/delete',
	verifyMiddleware.verifySystemAdmin,
	require('./person/deletePerson'),
	require('./blockchain/deletePerson'));

router.all('/users',
	verifyMiddleware.verifyPerson,
	graphQLHTTP((req, res) => ({ // to be replaced by router.post
		schema: require('./graphql/schemas/person'),
		context: { req, res },
		graphiql: process.env.NODE_ENV !== 'production'
	})));

/**
 * Request Form Routes
 */
router.all('/reqForm',
	verifyMiddleware.verifyPerson,
	// verifyMiddleware.verifyAdminOrGC,
	graphQLHTTP((req, res) => ({ // to be replaced by router.post
		schema: require('./graphql/schemas/request_form'),
		context: { req, res },
		graphiql: process.env.NODE_ENV !== 'production'
	})));

/**
 * Template Routes
 */
router.post('/templates/add',
	verifyMiddleware.verifyPerson,
	verifyMiddleware.verifyAdmin,
	require('./templates/addTemplate'),
	require('./blockchain/addTemplate'));

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

router.post('/templates/submit',
	verifyMiddleware.verifyPerson,
	verifyMiddleware.verifyAdmin,
	queryMiddleware.getTemplateRequestId,
	require('./templates/submitTemplate'),
	require('./blockchain/submitTemplate'));

router.post('/templates/approve',
	verifyMiddleware.verifyPerson,
	verifyMiddleware.verifyRequestingAuthority,
	queryMiddleware.getTemplateRequestId,
	require('./templates/approveTemplate'),
	require('./blockchain/approveTemplate'),
	require('./forms/addForm'),
	require('./blockchain/addForm'));


router.post('/templates/rejectAndImprove',
	verifyMiddleware.verifyPerson,
	verifyMiddleware.verifyRequestingAuthority,
	queryMiddleware.getTemplateRequestId,
	require('./templates/rejectTemplateAndImprove'),
	require('./blockchain/rejectTemplate'),
	require('../utils/sendSuccess'));

router.post('/templates/rejectAndDelete',
	verifyMiddleware.verifyPerson,
	verifyMiddleware.verifyAdmin,
	queryMiddleware.getTemplateRequestId,
	require('./templates/rejectTemplateAndDelete'),
	require('./blockchain/rejectTemplate'),
	require('./blockchain/deleteTemplate'));

router.all('/templates',
	verifyMiddleware.verifyPerson,
	graphQLHTTP((req, res) => ({ // to be replaced by router.post
		schema: require('./graphql/schemas/template'),
		context: { req, res },
		graphiql: process.env.NODE_ENV !== 'production'
	})));

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

router.post('/forms/assignUser',
	verifyMiddleware.verifyPerson,
	verifyMiddleware.verifyGC,
	require('./forms/assignUser'),
	require('./blockchain/assignForm'));

router.post('/forms/assignGC',
	verifyMiddleware.verifyPerson,
	verifyMiddleware.verifyAdmin,
	require('./forms/assignGCAndDeadline'),
	require('./blockchain/assignForm'));

router.post('/forms/forfeit',
	verifyMiddleware.verifyPerson,
	require('./blockchain/forfeitForm'));

router.post('/forms/submitToGC',
	verifyMiddleware.verifyPerson,
	require('./forms/submitToGC'),
	require('./blockchain/submitForm'));

router.post('/forms/submitToAdmin',
	verifyMiddleware.verifyPerson,
	verifyMiddleware.verifyGC,
	require('./forms/submitToAdmin'),
	require('./blockchain/submitForm'));

router.post('/forms/approveGC',
	verifyMiddleware.verifyPerson,
	require('./forms/approveGCAndSubmitToAdmin'),
	require('./blockchain/approveForm'));

router.post('/forms/approveAdmin',
	verifyMiddleware.verifyPerson,
	queryMiddleware.getFormRequestId,
	require('./forms/approveAdminAndSubmitToRA'),
	require('./blockchain/approveForm'),
	require('./blockchain/submitForm'));

router.post('/forms/rejectAdminAndImprove',
	verifyMiddleware.verifyPerson,
	verifyMiddleware.verifyAdmin,
	require('./forms/rejectFormAdmin'),
	require('./blockchain/rejectFormAdmin'),
	require('./forms/assignGCAndDeadline'),
	require('./blockchain/assignForm'));

router.post('/forms/approveRA',
	verifyMiddleware.verifyPerson,
	verifyMiddleware.verifyRequestingAuthority,
	queryMiddleware.getFormRequestId,
	require('./forms/approveRA'),
	require('./blockchain/approveForm'),
	require('./blockchain/submitForm'));

router.post('/forms/rejectRA',
	verifyMiddleware.verifyPerson,
	verifyMiddleware.verifyRequestingAuthority,
	require('./forms/rejectFormRA'),
	require('./blockchain/rejectFormRA'),
	require('./blockchain/deleteForm'));


router.all('/forms',
	verifyMiddleware.verifyPerson,
	graphQLHTTP((req, res) => ({ // to be replaced by router.post
		schema: require('./graphql/schemas/form'),
		context: { req, res },
		graphiql: process.env.NODE_ENV !== 'production'
	})));

/**
 * Requesting Authority Routes
 */
router.post('/reqAuth/add',
	verifyMiddleware.verifySystemAdmin,
	require('./requestingAuth/addReqestingAuth'));

router.post('/reqAuth/remove',
	verifyMiddleware.verifySystemAdmin,
	require('./requestingAuth/removeRequestingAuth'));

router.post('/reqAuth/request',
	verifyMiddleware.verifyPerson,
	verifyMiddleware.verifyRequestingAuthority,
	require('./requestingAuth/makeRequest'));

/**
 * Issue Tracker Routes
 */
router.post('/issueTracker/add',
	verifyMiddleware.verifyPerson,
	require('./issueTracker/createIssue'));

router.post('/issueTracker/update',
	verifyMiddleware.verifyPerson,
	require('./issueTracker/updateIssueOrComment'));

router.post('/issueTracker/delete',
	verifyMiddleware.verifyPerson,
	require('./issueTracker/deleteIssueOrComment'));

router.all('/issueTracker',
	verifyMiddleware.verifyPerson,
	graphQLHTTP((req, res) => ({ // to be replaced by router.post
		schema: require('./graphql/schemas/issue_tracker'),
		context: { req, res },
		graphiql: process.env.NODE_ENV !== 'production'
	})));

/**
 * Division Routes
 */
router.post('/division/add',
	verifyMiddleware.verifySystemAdmin,
	require('./divisions/addDivision'));

router.all('/division',
	verifyMiddleware.verifyPerson,
	graphQLHTTP((req, res) => ({ // to be replaced by router.post
		schema: require('./graphql/schemas/division'),
		context: { req, res },
		graphiql: process.env.NODE_ENV !== 'production'
	})));

/**
 * System Admin Routes
 */
router.post('/systemAdmin/add',
	require('./systemAdmin/addSystemAdmin'));

router.post('/systemAdmin/login',
	require('./systemAdmin/loginSystemAdmin'));

/**
 * Blockchain Query Routes
 */
router.post('/query/getMyForms',
	verifyMiddleware.verifyPerson,
	queryMiddleware.getMyForms);

router.post('/query/getTemplateRequestId',
	verifyMiddleware.verifyPerson,
	queryMiddleware.getTemplateRequestId,
	require('../utils/sendSuccess'));

router.post('/query/getFormRequestId',
	verifyMiddleware.verifyPerson,
	queryMiddleware.getFormRequestId,
	require('../utils/sendSuccess'));

router.post('/query/getFormProgress',
	verifyMiddleware.verifyPerson,
	queryMiddleware.getFormProgress);

router.post('/query/getTemplateProgress',
	verifyMiddleware.verifyPerson,
	queryMiddleware.getTemplateProgress);

/**
* Notification Route
*/
router.get('/notification',
	verifyMiddleware.verifyPerson,
	require('../utils/sseHelper'),
	require('./notifications/notifications'));

/**
 * Translate Route
 */
router.post('/translate',
	require('./translate/translate'));

/**
 * OCR Route
 */
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/ocr',
	upload.single('avatar'),
	require('./ocr/ocr'));

router.get('/some', require('../../config/addDbPeopleToBC'));

module.exports = router;