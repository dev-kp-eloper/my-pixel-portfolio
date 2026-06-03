import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import { Contact } from '../models/Contact';
import { contactRateLimiter } from '../middleware/rateLimit';
import { sendContactEmail } from '../utils/email';

const router = Router();

router.post('/', contactRateLimiter, async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      res.status(400).json({ message: 'All fields (name, email, message) are required.' });
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: 'Invalid email address format.' });
      return;
    }

    // Attempt to save to database (graceful — don't fail if DB is unavailable)
    let savedContact = null;
    const isDbConnected = mongoose.connection.readyState === 1; // 1 = connected

    if (isDbConnected) {
      try {
        const newContact = new Contact({ name, email, message });
        savedContact = await newContact.save();
        console.log('Contact saved to database:', savedContact._id);
      } catch (dbError) {
        console.warn('Database save failed (non-critical):', dbError);
      }
    } else {
      console.warn('MongoDB not connected (readyState:', mongoose.connection.readyState, '). Skipping DB save.');
    }

    // Always dispatch email notification — this is the critical path
    sendContactEmail(name, email, message).catch((err) => {
      console.error('Background email dispatch failed:', err);
    });

    res.status(201).json({
      message: 'Guild invitation successfully sent! Check quest log.',
      data: {
        id: savedContact?._id || null,
        name,
        createdAt: savedContact?.createdAt || new Date()
      }
    });
  } catch (error) {
    console.error('Error handling contact form submission:', error);
    res.status(500).json({ message: 'Server error. Failed to deliver the message.' });
  }
});

export default router;
