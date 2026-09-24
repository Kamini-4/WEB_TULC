import { Request, Response, NextFunction } from 'express';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  return EMAIL_REGEX.test(email.trim());
}

export function validateContactRequest(req: Request, res: Response, next: NextFunction) {
  const { name, email, type } = req.body || {};

  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: 'Principal name is required.' });
  }

  if (!email || !validateEmail(email)) {
    return res.status(400).json({ error: 'A valid email address is required.' });
  }

  // Sanitize
  req.body.name = name.trim();
  req.body.email = email.trim().toLowerCase();
  req.body.organization = (req.body.organization || 'Institutional Inquiry').trim();
  req.body.type = type || 'LEAD_ENTRY';

  next();
}

export function validateNewsletterRequest(req: Request, res: Response, next: NextFunction) {
  const { subscribers, title, content } = req.body || {};

  if (!subscribers || !Array.isArray(subscribers) || subscribers.length === 0) {
    return res.status(400).json({ error: 'Subscribers list is required and must not be empty.' });
  }

  const validSubscribers = subscribers.filter(email => validateEmail(email));
  if (validSubscribers.length === 0) {
    return res.status(400).json({ error: 'No valid recipient email addresses provided in the subscriber list.' });
  }

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'Newsletter dispatch title is required.' });
  }

  if (!content || !Array.isArray(content) || content.length === 0) {
    return res.status(400).json({ error: 'Newsletter dispatch content paragraphs are required.' });
  }

  req.body.subscribers = validSubscribers;
  req.body.title = title.trim();

  next();
}

export function validateChatRequest(req: Request, res: Response, next: NextFunction) {
  const { message } = req.body || {};

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Message payload cannot be empty.' });
  }

  req.body.message = message.trim();
  next();
}

export function validatePasskeyRequest(req: Request, res: Response, next: NextFunction) {
  const { key } = req.body || {};

  if (!key || typeof key !== 'string' || !key.trim()) {
    return res.status(400).json({ valid: false, reason: 'missing_key', error: 'Passkey is required.' });
  }

  req.body.key = key.trim().toUpperCase();
  next();
}
