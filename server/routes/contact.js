
import { Router } from 'express';
import nodemailer from 'nodemailer';

const router = Router();

const services = [
  'General Trading',
  'Construction',
  'General Supply',
  'Clearance & Forwarding',
  'Other'
];

router.post('/contact', async (req, res) => {
  const { name, email, phone, service, message } = req.body || {};

  if (
    typeof name !== 'string' ||
    name.trim().length < 2 ||
    name.length > 100 ||
    typeof email !== 'string' ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    typeof service !== 'string' ||
    !services.includes(service) ||
    typeof message !== 'string' ||
    message.trim().length < 10 ||
    message.length > 4000 ||
    (phone !== undefined &&
      (typeof phone !== 'string' || phone.length > 40))
  ) {
    return res.status(400).json({
      error: 'Please enter valid details and a message of at least 10 characters.'
    });
  }

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    SMTP_FROM,
    CONTACT_TO
  } = process.env;

  if (![SMTP_HOST, SMTP_PORT, SMTP_USER,
         SMTP_PASS, SMTP_FROM, CONTACT_TO].every(Boolean)) {
    return res.status(503).json({
      error: 'Email delivery is not configured yet.'
    });
  }

  try {
    const port = Number(SMTP_PORT);

    if (!Number.isInteger(port) || port < 1 || port > 65535) {
      throw new Error('Invalid SMTP port');
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      requireTLS: port !== 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: SMTP_FROM,
      to: CONTACT_TO,
      replyTo: email.trim(),
      subject: `Glad General Trading Enquiry: ${service}`,
      text: [
        'New website enquiry',
        `Name: ${name.trim()}`,
        `Email: ${email.trim()}`,
        `Phone: ${phone || 'Not provided'}`,
        `Service: ${service}`,
        '',
        `Message:\n${message.trim()}`
      ].join('\n')
    });

    res.json({
      ok: true,
      message: 'Your enquiry was submitted successfully.'
    });

  } catch (error) {
    console.error('Contact email error:', error.message);

    res.status(502).json({
      error: 'Unable to send your enquiry. Please try again later.'
    });
  }
});

export default router;
