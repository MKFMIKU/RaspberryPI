var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/app', function (req, res, next) {
  res.render('app');
});

router.get('/app/help', function (req, res, next) {
  var base = "images/image.png";
  var cam_path = "camera/cam.jpg";
  if (fs.existsSync("../public/"+cam_path)){
    res.render('help', {cam_path: cam_path});
  } else {
    res.render('help', {cam_path: base})
  }
});

module.exports = router;
