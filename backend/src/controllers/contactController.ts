import { Request, Response, NextFunction } from 'express';
import { prisma } from '../index';

export const submitContactForm = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      });
    }

    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        subject,
        message
      }
    });

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: { id: submission.id }
    });
  } catch (error) {
    next(error);
  }
};