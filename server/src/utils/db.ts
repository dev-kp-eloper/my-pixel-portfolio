import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

// Lazy database connection — connects on first call, not at module load
// This prevents serverless cold-start timeouts when MongoDB Atlas is unreachable
let dbConnectionAttempted = false;

export async function ensureDbConnection(): Promise<boolean> {
  if (dbConnectionAttempted) {
    return mongoose.connection.readyState === 1;
  }
  dbConnectionAttempted = true;

  if (!MONGODB_URI || MONGODB_URI.includes('localhost') || MONGODB_URI.includes('127.0.0.1')) {
    console.log('No remote MONGODB_URI configured. Running in email-only mode.');
    return false;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 3000,
      socketTimeoutMS: 5000,
      connectTimeoutMS: 3000,
    });
    console.log('Connected to MongoDB database.');
    return true;
  } catch (error: any) {
    console.error('Database connection failed:', error.message || error);
    console.log('Running server in database-offline mode (email-only).');
    return false;
  }
}
