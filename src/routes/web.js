const express = require('express');
const router = express.Router();
const pickupController = require('../controllers/pickupController');

router
    .get('/test', pickupController.test)
    .get('/pickup-update', pickupController.makeUpdateSqlStatement)
    .get('/pickup-get', pickupController.makeSelectSqlStatement);

module.exports = router;