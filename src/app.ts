import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import accountRoutes from './routes/accountRoutes';
import candidateRoutes from './routes/candidateRoutes';
import questionRoutes from './routes/questionRoutes';
import { errorHandler } from './utils/errorHandler';

dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/accounts', accountRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/questions', questionRoutes);

// Error handling middleware
app.use(errorHandler);

// MongoDB connection

mongoose.connect(process.env.MONGO_URI || '')
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.error(`MongoDB connection error: ${error}`);
  });


export default app;
