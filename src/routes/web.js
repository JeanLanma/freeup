const express = require('express');
const router = express.Router();
const pickupController = require('../controllers/pickupController');

router
    .get('/test', pickupController.test)
    .get('/pickup-update', pickupController.makeUpdateSqlStatement)
    .get('/pickup-get', pickupController.makeSelectSqlStatement)
    .get('/pickup-upsert', pickupController.makeUpsertSqlStatement)
    .get('/pickup-detail', pickupController.makeDetailGetQueryStatement)
    .post('/pickup-store', pickupController.makeInsertPickupStatement);

module.exports = router;