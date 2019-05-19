const express = require('express');
const router = express.Router();

const partiesController = require('../controllers/parties');

router.get('/parties', partiesController.getParties);
router.post('/parties', partiesController.postParty);

module.exports = router;
