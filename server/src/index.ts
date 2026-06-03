import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import contactRoutes from './routes/contact';

// Load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pixel-portfolio';

// Setup CORS Origins
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : ['http://localhost:5173', 'http://localhost:3000'];

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
    timestamp: new Date()
  });
});

// Connect to database and boot up the server
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB database.');
  })
  .catch((error) => {
    console.error('Database connection failed:', error.message || error);
    console.log('Running server in database-offline mode.');
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
