const mongoose = require('mongoose');
const colors = require('colors');
const users = require('./data/user.json');
const restaurants = require('./data/restaurants.json');
const orders = require('./data/orders.json');
const User = require('./models/user.js');
const Restaurant = require('./models/restaurant.js');
const Order = require('./models/order.js');
const connectDB = require('./config/db.js');

const importData = async (Model, data) => {
  try {
    await Model.deleteMany();
    await Model.insertMany(data);

    console.log(`Data for ${Model.modelName} Imported!`.green.inverse);
    return Promise.resolve(); // Resolve the promise after successful import
  } catch (error) {
    console.error(`${error}`.red.inverse);
    return Promise.reject(error); // Reject the promise on error
  }
};

const destroyData = async (Model) => {
  try {
    await Model.deleteMany();
    console.log(`Data for ${Model.modelName} Destroyed!`.red.inverse);
    return Promise.resolve(); // Resolve the promise after successful destruction
  } catch (error) {
    console.error(`${error}`.red.inverse);
    return Promise.reject(error); // Reject the promise on error
  }
};

(async () => {
  connectDB();

  // Usage
  try {
    if (process.argv[2] === '-d') {
      await destroyData(User);
      await destroyData(Restaurant);
      await destroyData(Order);
    } else {
      // await importData(User, users);
      await importData(Restaurant, restaurants);
      // await importData(Order, orders);
    }
  } catch (error) {
    console.error(`${error}`.red.inverse);
  } finally {
    process.exit();
  }
})();
