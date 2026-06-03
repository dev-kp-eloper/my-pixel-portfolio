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
  : ['http://localhost:5173', 'http://localhost:3000', 'https://devesh-portfolio-pixel.vercel.app'];

// Trust proxy for correct IP detection behind Vercel/CDN
app.set('trust proxy', 1);

app.use(cors({
  origin: (origin, callback) => {
    // Dynamically allow all Vercel domains, localhost, and custom domains containing the name "devesh" or "pandagre"
    const isAllowedDomain = origin && (
      origin.endsWith('.vercel.app') || 
      origin.toLowerCase().includes('devesh') || 
      origin.toLowerCase().includes('pandagre')
    );
    
    if (!origin || allowedOrigins.includes(origin) || isAllowedDomain) {
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
