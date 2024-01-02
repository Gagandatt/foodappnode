// routes/orderRoutes.js
const express = require('express');
const {createOrder,placeOrder,getOrder,updateOrder,deleteOrder} = require('../controllers/orderController');

const router = express.Router();

// Routes for orders
router.post('/createOrder', createOrder);
router.post('/placeOrder', placeOrder);
router.get('/:orderId', getOrder);
router.put('/:orderId', updateOrder);
router.delete('/:orderId', deleteOrder);

module.exports = router;
