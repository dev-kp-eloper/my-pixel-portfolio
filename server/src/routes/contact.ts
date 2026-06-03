import { Router, Request, Response } from 'express';
import { contactRateLimiter } from '../middleware/rateLimit';
import { sendContactEmail } from '../utils/email';
import { trySaveContact } from '../utils/db';

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

    // Fire-and-forget: attempt DB save in background (non-blocking)
    trySaveContact(name, email, message).catch((err) => {
      console.warn('Background DB save failed (non-critical):', err);
    });

    // Fire-and-forget: send email notification in background (non-blocking)
    sendContactEmail(name, email, message).catch((err) => {
      console.error('Background email dispatch failed:', err);
    });

    // Respond immediately — don't wait for DB or email
    res.status(201).json({
      message: 'Guild invitation successfully sent! Check quest log.',
      data: {
        name,
        createdAt: new Date()
      }
    });
  } catch (error) {
    console.error('Error handling contact form submission:', error);
    res.status(500).json({ message: 'Server error. Failed to deliver the message.' });
  }
});

export default router;
