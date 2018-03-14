var express = require('express');
var router = express.Router();
const translate = require('google-translate-api');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

router.post('/translate', function (req, res) {
  translate(req.body.data, { from: 'en', to: 'hi' }).then(result => {
    console.log(result.text);
    //=> Ik spreek Nederlands!
    console.log(result.from.text.autoCorrected);
    //=> true
    console.log(result.from.text.value);
    //=> I [speak] Dutch!
    console.log(result.from.text.didYouMean);
    //=> false
    res.json(result.text);
  }).catch(err => {
    console.error(err);
  });
  console.log("Reached here!");
  console.log(req.body);
});

module.exports = router;
