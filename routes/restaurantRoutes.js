// routes/restaurantRoutes.js
const express = require('express');
const { createRestaurant, getRestaurant, updateRestaurant, deleteRestaurant, getAllRestaurants, getRestaurantMenu }
    = require('../controllers/restaurantController');

const router = express.Router();

// Routes for restaurants
router.post('/register', createRestaurant);
router.get('/:restaurantId', getRestaurant);
router.put('/:restaurantId', updateRestaurant);
router.delete('/:restaurantId', deleteRestaurant);
router.get('/all', getRestaurant);
router.get('/:restaurantId/menu', getRestaurantMenu);
module.exports = router;
