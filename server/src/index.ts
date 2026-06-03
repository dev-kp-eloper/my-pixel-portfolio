import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import contactRoutes from './routes/contact';
import { ensureDbConnection } from './utils/db';

// Load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Setup CORS Origins
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : ['http://localhost:5173', 'http://localhost:3000', 'https://my-pixel-portfolio-mu.vercel.app'];

// Trust proxy for correct IP detection behind Vercel/CDN
app.set('trust proxy', 1);

app.use(cors({
  origin: (origin, callback) => {
    // Dynamically allow Vercel previews and branch deployments for this project
    const isVercelDomain = origin && origin.includes('my-pixel-portfolio') && origin.endsWith('.vercel.app');
    
    if (!origin || allowedOrigins.includes(origin) || isVercelDomain) {
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

// For local development only — connect eagerly and start listening
const isProduction = process.env.NODE_ENV === 'production' || !!process.env.VERCEL;
if (!isProduction) {
  ensureDbConnection();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
