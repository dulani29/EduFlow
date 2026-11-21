// config/db.js
// Centralised MongoDB (Atlas) connection helper using Mongoose.
// The server calls this at startup (see src/server.js).

const mongoose = require('mongoose');

// Use the URI from the .env file. The project defines MONGODB_URI, but many examples use MONGO_URI.
// We'll read whichever is defined, falling back to the other for compatibility.
const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;

// Connection options tuned for faster initial connection and better stability.
const connectOptions = {
  // New URL parser and unified topology are the defaults in recent Mongoose versions,
  // but we set them explicitly for clarity.
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Reduce the time Mongoose spends discovering servers before timing out.
  serverSelectionTimeoutMS: 5000, // 5 seconds
  // Keep sockets alive and reuse connections for subsequent requests.
  socketTimeoutMS: 30000,
  // Enable connection pooling (default is 5). Increase for high‑concurrency workloads.
  maxPoolSize: 20,
};

/**
 * Connects to MongoDB Atlas (or a local fallback) using Mongoose.
 * The function returns a promise so callers can await it if desired.
 */
const connectDB = async () => {
  if (!mongoURI) {
    console.error('❌ MongoDB connection string not found. Set MONGODB_URI in .env');
    process.exit(1);
  }

  try {
    // Mongoose caches the connection; subsequent calls are essentially no‑ops.
    await mongoose.connect(mongoURI, connectOptions);
    console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    // Exit process so the dev server restarts and we don’t run without a DB.
    process.exit(1);
  }
};

module.exports = connectDB;
