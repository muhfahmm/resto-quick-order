const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Route definitions for orders
router.post('/', orderController.createOrder);

module.exports = router;
