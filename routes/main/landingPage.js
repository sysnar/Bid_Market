const express = require('express');
const router = express.Router();

// URL : /main
router.get('/', function(req, res, next){
  res.render('main/index.html');
});

// URL : /main/client
router.get('/client', function(req, res, next){
  res.render('adsiter/clients.html');
});

// URL : /main/notice
router.get('/notice', function(req, res, next){
  res.render('notice/notice.ejs');
});

// URL : /main/contact
router.get('/contact', function(req, res, next){
  res.render('adsiter/contact.html')
}); 


module.exports = router;