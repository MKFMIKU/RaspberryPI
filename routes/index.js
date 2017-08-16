var express = require('express');
var router = express.Router();
var fs = require('fs');

var tencentyoutuyun = require('tencentyoutuyun'),
  youtuconf = tencentyoutuyun.conf,
  youtu = tencentyoutuyun.youtu;
youtuconf.setAppInfo("10094755", "AKIDyqW0IOR3azEGMdwtlQuEMI5h3ILCEKbg",
  "4631qTu9EA5sZ7UfhXAcrz0qjRzQgjaF", "side", 0);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/app', function (req, res, next) {
  res.render('app');
});

router.get('/app/help', function (req, res, next) {
  var base = "/images/image.png";
  var cam_path = "/camera/cam.jpg";
  if (fs.existsSync("public"+cam_path)){
    checkImage("public"+cam_path, function (data) {
      var tags = data.data.tags;
      var tags_describe = "";
      tags.map(function (tag) {
        tags_describe += tag.tag_name+',';
      });

      res.render('help', {cam_path: cam_path, tag: "视野中有："+tags_describe});
    });
  } else {
    res.render('help', {cam_path: base})
  }
});

function checkImage(path, cb) {
  youtu.imagetag(path,function (data) {
    cb(data);
  })
}

module.exports = router;
