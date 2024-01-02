const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const socketIo = require('./socket'); 
const connectDB = require('./config/db');
const app = express();
const server = http.createServer(app);
socketIo.init(server);
// Middleware to parse JSON in request body
app.use(bodyParser.json());
app.use(express.json());
// Connect to MongoDB
connectDB();
app.use(cors());
// Middleware, CORS handling, etc.

// Use routes
app.use('/api', userRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/menu', menuRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
