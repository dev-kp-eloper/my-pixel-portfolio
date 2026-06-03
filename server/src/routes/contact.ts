import { Router, Request, Response } from 'express';
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

    // Create and save database entry
    const newContact = new Contact({
      name,
      email,
      message
    });

    await newContact.save();

    // Dispatch email alert asynchronously (non-blocking for fast client response)
    sendContactEmail(name, email, message).catch((err) => {
      console.error('Background email dispatch failed:', err);
    });

    res.status(201).json({
      message: 'Guild invitation successfully sent! Check quest log.',
      data: {
        id: newContact._id,
        name: newContact.name,
        createdAt: newContact.createdAt
      }
    });
  } catch (error) {
    console.error('Error handling contact form submission:', error);
    res.status(500).json({ message: 'Server error. Failed to deliver the message.' });
  }
});

export default router;
