// controllers/orderController.js
const Order = require('../models/order');
const io = require('../socket');

const orderController = {
  // Function to create a new order
  createOrder: async (req, res) => {
    // Assuming you send order data in the request body
    const orderData = req.body;
    try {
      const newOrder = await Order.create(orderData);
      res.status(201).json(newOrder);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  // Function to get an order by ID
  getOrder: async (req, res) => {
    const orderId = req.params.orderId;
    console.log('orderId:', orderId);
    try {
      const order = await Order.findOne({"orderId":orderId});
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      res.json(order);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  // Function to update an order by ID
  updateOrder: async (req, res) => {
    const orderId = req.params.orderId;
    const updatedData = req.body; // Assuming you send the updated data in the request body
  
    try {
      // Find the order by orderId
      const existingOrder = await Order.findOne({ orderId });
  
      // Check if the order exists
      if (!existingOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      // Update the order with new data
      const updatedOrder = await Order.findOneAndUpdate({ orderId }, updatedData, { new: true });
  
      res.status(201).json(updatedOrder);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  

  // Function to delete an order by ID
  deleteOrder: async (req, res) => {
    const orderId = req.params.orderId;
  
    try {
      // Find the order by orderId
      const existingOrder = await Order.findOne({ orderId });
  
      // Check if the order exists
      if (!existingOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      // Delete the order
      const deletedOrder = await Order.findOneAndDelete({ orderId });
  
      res.json({ message: 'Order deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  
  placeOrder: async (req, res) => {
    const orderData = req.body;
    try {
      const newOrder = await Order.create(orderData);
      // Emit an event for real-time updates (Socket.io)
      // Example: io.emit('orderPlaced', newOrder);
      res.status(201).json(newOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  // ... other order-related functions
};

module.exports = orderController;
