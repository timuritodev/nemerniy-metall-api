const router = require('express').Router();
const { sendEmail } = require('../controllers/contacts');

router.post('/', sendEmail);

module.exports = router;
