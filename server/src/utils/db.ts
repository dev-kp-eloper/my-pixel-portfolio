import mongoose from 'mongoose';
import { Contact } from '../models/Contact';

const MONGODB_URI = process.env.MONGODB_URI || '';

// Lazy database connection — connects on first call, not at module load
let dbConnectionAttempted = false;

async function ensureDbConnection(): Promise<boolean> {
  if (mongoose.connection.readyState === 1) return true;
  if (dbConnectionAttempted) return false;
  dbConnectionAttempted = true;

  const isLocalhost = !MONGODB_URI || MONGODB_URI.includes('localhost') || MONGODB_URI.includes('127.0.0.1');
  if (isLocalhost) {
    console.log('No remote MONGODB_URI configured. Skipping DB connection.');
    return false;
  }

  try {
    // Race the connection against a hard 3-second timeout
    await Promise.race([
      mongoose.connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 2500,
        socketTimeoutMS: 3000,
        connectTimeoutMS: 2500,
      }),
      new Promise((_, reject) => setTimeout(() => reject(new Error('DB connection hard timeout (3s)')), 3000))
    ]);
    console.log('Connected to MongoDB database.');
    return true;
  } catch (error: any) {
    console.error('Database connection failed:', error.message || error);
    // Disconnect to prevent hanging connections
    try { await mongoose.disconnect(); } catch { /* ignore */ }
    return false;
  }
}

// Fire-and-forget function to try saving a contact to MongoDB
export async function trySaveContact(name: string, email: string, message: string): Promise<void> {
  const connected = await ensureDbConnection();
  if (!connected) {
    console.log('DB not available. Contact from', email, 'not persisted (email-only mode).');
    return;
  }

  try {
    const newContact = new Contact({ name, email, message });
    const saved = await newContact.save();
    console.log('Contact saved to database:', saved._id);
  } catch (err) {
    console.warn('Failed to save contact to DB:', err);
  }
}

export { ensureDbConnection };
