// config/db.js
const mongoose = require('mongoose');

const uri = 'mongodb+srv://tuhiyarmeragagan:Gagandatt321@cluster0.hjp9loq.mongodb.net/todo';
// const uri = 'mongodb+srv://tuhiyarmeragagan:GaganDB%40123@cluster0.mongodb.net/namedemo';

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
        // useUnifiedTopology: true, 
        // useNewUrlParser: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
