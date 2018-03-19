var express = require('express');
var router = express.Router();

router.all('/', function(req, res) {
	console.log(res.body);
	res.json({ success: true });
});


router.post('/users/registerPerson', require('./users/registerPerson'), require('./blockchain/addPerson'));
router.post('/divisions/addDivision', require('./divisions/addDivision'));
router.post('/forms/addForm', require('./blockchain/addForm'));

module.exports = router;
