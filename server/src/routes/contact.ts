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

    console.log(`Processing contact request for player: ${name} (${email})`);

    // Execute both database write and email notification in parallel.
    // We await Promise.allSettled to guarantee that the serverless function remains
    // active and executes these operations fully before responding. Both tasks
    // have strict internal timeouts to prevent hanging.
    const results = await Promise.allSettled([
      trySaveContact(name, email, message),
      sendContactEmail(name, email, message)
    ]);

    const dbSaved = results[0].status === 'fulfilled' && results[0].value === true;
    const emailSent = results[1].status === 'fulfilled' && results[1].value === true;

    console.log(`Execution complete. DB saved: ${dbSaved}, Email sent: ${emailSent}`);

    // If both failed, notify the client. Otherwise, return success.
    if (!dbSaved && !emailSent) {
      res.status(500).json({ 
        message: 'Server error. Failed to deliver the message via database or email.' 
      });
      return;
    }

    res.status(201).json({
      message: 'Guild invitation successfully sent! Check quest log.',
      data: {
        name,
        createdAt: new Date(),
        dbSaved,
        emailSent
      }
    });
  } catch (error) {
    console.error('Error handling contact form submission:', error);
    res.status(500).json({ message: 'Server error. Failed to deliver the message.' });
  }
});

export default router;
