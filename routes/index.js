const router = require('express').Router();
const notesRouterHTML = require('./notesHTML');
const notesRouterAPI = require('./notesAPI');

router.use('/notes', notesRouterHTML);
router.use('/api/notes', notesRouterAPI);


module.exports = router;