import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import { MongoMemoryServer } from "mongodb-memory-server";
import itemRoutes from "./src/routes/item.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/v1/items', itemRoutes);

// In-server MongoDB Setup
const startServer = async () => {
  try {
    // Start an in-memory MongoDB instance
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    // Connect Mongoose to the in-memory database
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('In-memory MongoDB connected successfully');

    // Start the Express server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Error starting server:', err);
  }
};

startServer();