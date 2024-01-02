// controllers/restaurantController.js
const Restaurant = require('../models/restaurant');

const restaurantController = {
  // Function to create a new restaurant
  createRestaurant: async (req, res) => {
    // Assuming you send restaurant data in the request body
    const restaurantData = req.body;

    try {
      const newRestaurant = await Restaurant.create(restaurantData);
      res.status(201).json(newRestaurant); // Use status 201 for resource creation
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // Function to get a restaurant by ID
  getRestaurant: async (req, res) => {
    const restaurantId = req.params.restaurantId;

    // try {
    //   const restaurant = await Restaurant.findById(restaurantId);
    //   if (!restaurant) {
    //     return res.status(404).json({ message: 'Restaurant not found' });
    //   }

    //   res.json(restaurant);
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).send('Internal Server Error');
    // }
    try {
      if (restaurantId.toLowerCase() === 'all') {
        const restaurants = await Restaurant.find();
        res.json(restaurants);
      } else {
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
          return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.json(restaurant);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // Function to update a restaurant by ID
  updateRestaurant: async (req, res) => {
    const restaurantId = req.params.restaurantId;
    const updatedData = req.body;

    try {
      // Find the restaurant
      const existingRestaurant = await Restaurant.findById(restaurantId);

      if (!existingRestaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }

      // Update the restaurant with the new data
      existingRestaurant.set(updatedData);
      const updatedRestaurant = await existingRestaurant.save();

      res.json(updatedRestaurant);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  // Function to delete a restaurant by ID
  deleteRestaurant: async (req, res) => {
    const restaurantId = req.params.restaurantId;

    try {
      // Find the restaurant first
      const existingRestaurant = await Restaurant.findById(restaurantId);

      if (!existingRestaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }

      // Delete the found restaurant
      const deletionResult = await Restaurant.deleteOne({ _id: restaurantId });

      if (deletionResult.deletedCount === 1) {
        res.json({ message: 'Restaurant deleted successfully' });
      } else {
        res.status(500).json({ message: 'Failed to delete restaurant' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  getAllRestaurants: async (req, res) => {
    // try {
    //   const restaurants = await Restaurant.find();
    //   res.json(restaurants);
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).json({ message: 'Internal Server Error' });
    // }
  },

  getRestaurantMenu: async (req, res) => {
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

  // ... other restaurant-related functions
};

module.exports = restaurantController;
