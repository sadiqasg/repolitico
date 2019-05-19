const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const partiesController = require('../controllers/parties');

router.get('/parties', partiesController.getParties);
router.post('/parties', partiesController.postParty);
router.patch('/parties/:id', partiesController.editParty);
router.get('/parties/:id', partiesController.getSingleParty);
router.delete('/parties/:id', partiesController.deleteParty);

module.exports = router;
