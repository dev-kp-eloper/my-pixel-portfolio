import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import contactRoutes from './routes/contact';

// Load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || '';

// Setup CORS Origins
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : ['http://localhost:5173', 'http://localhost:3000', 'https://my-pixel-portfolio-mu.vercel.app'];

// Trust proxy for correct IP detection behind Vercel/CDN
app.set('trust proxy', 1);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// API Routes
app.use('/api/contact', contactRoutes);

// Basic server health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    gameboy: 'online',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date()
  });
});

// Connect to database only if a valid MONGODB_URI is provided
const isLocalhostDb = !MONGODB_URI || MONGODB_URI.includes('localhost') || MONGODB_URI.includes('127.0.0.1');
const isProduction = process.env.NODE_ENV === 'production' || !!process.env.VERCEL;

if (MONGODB_URI && !(isProduction && isLocalhostDb)) {
  mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000, // Fail fast in serverless
    socketTimeoutMS: 10000,
  })
    .then(() => {
      console.log('Connected to MongoDB database.');
    })
    .catch((error) => {
      console.error('Database connection failed:', error.message || error);
      console.log('Running server in database-offline mode.');
    });
} else {
  console.log('No valid MONGODB_URI configured. Running in email-only mode (no database).');
}

if (!isProduction || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
