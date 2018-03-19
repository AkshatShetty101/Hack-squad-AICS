var express = require('express');
var router = express.Router();

router.all('/', function(req, res) {
	console.log(res.body);
	res.json({ success: true });
});


router.post('/addPerson', require('./blockchain/addPerson'));
router.post('/addForm', require('./blockchain/addForm'));

module.exports = router;
