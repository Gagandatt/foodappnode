// controllers/menuController.js
const Restaurant = require('../models/restaurant');

const menuController = {
  // Function to get the menu of a restaurant by ID
  getMenu: async (req, res) => {
    const restaurantId = req.params.restaurantId;

    try {
      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }

      res.json(restaurant.menu);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // Function to create a new menu item for a restaurant
  createMenuItem: async (req, res) => {
    const restaurantId = req.params.restaurantId;
    const menuItemData = req.body;

    try {
      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }

      restaurant.menu.push(menuItemData);
      await restaurant.save();

      res.status(201).json(restaurant.menu);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // Function to update a menu item for a restaurant
  updateMenuItem: async (req, res) => {
    const restaurantId = req.params.restaurantId;
    const menuItemId = req.params.menuItemId;
    const updatedData = req.body;

    try {
      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }

      const menuItem = restaurant.menu.id(menuItemId);
      if (!menuItem) {
        return res.status(404).json({ message: 'Menu item not found' });
      }

      menuItem.set(updatedData);
      await restaurant.save();

      res.json(menuItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // Function to delete a menu item for a restaurant
  deleteMenuItem: async (req, res) => {
    const restaurantId = req.params.restaurantId;
    const menuItemId = req.params.menuItemId;

    try {
      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }

      // Filter out the menu item with the specified ID
      restaurant.menu = restaurant.menu.filter(item => item._id != menuItemId);

      await restaurant.save();

      res.json({ message: 'Menu item deleted successfully', menu: restaurant.menu });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

module.exports = menuController;
