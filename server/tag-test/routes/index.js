var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
var tags = require('../models/tag');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'public/html', 'main.html'));
});

router.get('/loadData', function (req, res) {
  tags.find({}, { "tags": 1 }, function (err, data) {
    if (err) {
      res.status(200).send(err);
    }
    else {

      res.send(data);
    }
  })
});

router.post('/query', function (req, res) {
  var q = req.body.data.toString().split(" ");
  console.log(q);
  tags.find({ tags: { $in: q } }, { "tags": 1 }).limit(5).then(function (result, err) {
    if (err) {
      res.send(err);
    }
    else {
      doIt(result,q).then(function(data){
        console.log(data);
        res.json(data);
      });
    }
  });
});

function doIt(result,q) {
  return new Promise(function(resolve, reject) {
    var x = [];
    for (data of result) {
      // console.log(data);
      var d = q.diff(data.tags);
      x.push({
        tags:data.tags,
        match:(d.length/q.length)
      });
    }
    resolve(x);
  });
}
Array.prototype.diff = function (arr2) {
  var ret = [];
  this.sort();
  arr2.sort();
  for (var i = 0; i < this.length; i += 1) {
    if (arr2.indexOf(this[i]) > -1) {
      ret.push(this[i]);
    }
  }
  return ret;
};

module.exports = router;
