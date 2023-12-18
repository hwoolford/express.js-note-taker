const router = require('express').Router();
const notesRouterAPI = require('./notesAPI');

router.use('/api/notes', notesRouterAPI);


module.exports = router;