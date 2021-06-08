const express = require('express');
const router = express.Router();


// URL : /contact
router.get('/', function(req, res, next){
  res.render('adsiter/contact.html')
}); 

module.exports = router;