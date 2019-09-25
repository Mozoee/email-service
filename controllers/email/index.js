const router = require('express').Router();
const sendEmail = require('./send-email');

router.post('/', sendEmail.sendEmail);

module.exports = router;
