const express = require('express');
const router = express.Router();

const requestsPage = require('./requestsPage');

router.get('/', requestsPage); // URL : /main/requests
router.get('/form', requestsPage); // URL : /main/requests/form
router.post('/form', requestsPage); // URL : /main/requests/process

module.exports = router;