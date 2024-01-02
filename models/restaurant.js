const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cuisine: String,
  address: String,
  image: String,
  menu: [{
    name: {
      type: String,
      image: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    // ... other menu item details
  }],
  // ... other restaurant-related fields
});
restaurantSchema.pre('save', async function (next) {
  const restaurant = this;
  if (!restaurant.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(restaurant.password, salt);
  restaurant.password = hash;
  next();
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;