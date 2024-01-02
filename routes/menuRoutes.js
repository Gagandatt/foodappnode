// routes/menuRoutes.js
const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// Route to get the menu of a restaurant
router.get('/:restaurantId/menu', menuController.getMenu);

// Route to create a new menu item for a restaurant
router.post('/:restaurantId/menu/create', menuController.createMenuItem);

// Route to update a menu item for a restaurant
router.put('/:restaurantId/menu/:menuItemId/update', menuController.updateMenuItem);

// Route to delete a menu item for a restaurant
router.delete('/:restaurantId/menu/:menuItemId/delete', menuController.deleteMenuItem);

module.exports = router;
