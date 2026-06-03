import mongoose from 'mongoose';
import { Contact } from '../models/Contact';

const MONGODB_URI = process.env.MONGODB_URI || '';

declare global {
  var mongooseCached: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

const cached = global.mongooseCached || (global.mongooseCached = { conn: null, promise: null });

async function connectToDatabase(): Promise<typeof mongoose | null> {
  if (cached.conn) {
    return cached.conn;
  }

  const isLocalhost = !MONGODB_URI || MONGODB_URI.includes('localhost') || MONGODB_URI.includes('127.0.0.1');
  if (isLocalhost) {
    console.log('No remote MONGODB_URI configured. Skipping DB connection.');
    return null;
  }

  if (!cached.promise) {
    console.log('Initiating cached MongoDB connection...');
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false, // Disable buffering so queries fail fast
      maxPoolSize: 1, // Keep pool small for serverless
      serverSelectionTimeoutMS: 2500,
      connectTimeoutMS: 2500,
    }).then((m) => m);
  }

  try {
    if (cached.promise) {
      // Race connection promise with a hard timeout
      cached.conn = await Promise.race([
        cached.promise,
        new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('MongoDB connection hard timeout (3s)')), 3000)
        )
      ]);
    }
    return cached.conn;
  } catch (error: any) {
    console.error('Database connection failed:', error.message || error);
    cached.promise = null; // Clear cached promise on failure
    return null;
  }
}

// Save contact to MongoDB
export async function trySaveContact(name: string, email: string, message: string): Promise<boolean> {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      console.log(`DB not available. Contact from ${email} not persisted (email-only mode).`);
      return false;
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();
    console.log(`Contact saved to database successfully.`);
    return true;
  } catch (err: any) {
    console.warn('Failed to save contact to DB:', err.message || err);
    return false;
  }
}

export { connectToDatabase as ensureDbConnection };
