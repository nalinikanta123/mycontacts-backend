const mongoose = require('mongoose');

const connectDB = async () => {
  console.log('Connecting to MongoDB...');
  console.log('MONGO_URI:', process.env.MONGODB_URI); // Debugging line to check the URI
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;