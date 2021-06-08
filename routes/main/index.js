const express = require('express');
const router = express.Router();

const landingPage = require('./landingPage');
const requestsPage = require('./requests/index');

router.get('/', landingPage); // URL : /main
router.get('/notice', landingPage); // URL : /main/notice
router.use('/requests', requestsPage); // URL : /main/requests
router.get('/client', landingPage); // URL : /main/client
router.get('/contact', landingPage); // URL : /main/contact

module.exports = router;