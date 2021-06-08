const express = require('express');
const router = express.Router();

// Require Routers
const cron = require('./cron/index');
const main = require('./main/index');
const contact = require('./contact/index');
const naraMarketplace = require('./naraMarketplace/index');

// Mapping Routers
router.use('/cron', cron);
router.use('/main', main);
router.use('/contact', contact);
router.use('/naraMarketplace', naraMarketplace);

router.get('/', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.redirect('/main')
});

module.exports = router;