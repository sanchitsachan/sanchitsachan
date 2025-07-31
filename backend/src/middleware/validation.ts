import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { AppError } from './errorHandler';

// Validation helper
const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const message = error.details.map(detail => detail.message).join(', ');
      throw new AppError(message, 400);
    }
    next();
  };
};

// Auth validation schemas
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  firstName: Joi.string().max(50),
  lastName: Joi.string().max(50)
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// Broker validation schema
const brokerSchema = Joi.object({
  name: Joi.string().required(),
  website: Joi.string().uri().required(),
  description: Joi.string(),
  shortDescription: Joi.string().max(200),
  foundedYear: Joi.number().integer().min(1900).max(new Date().getFullYear()),
  headquarters: Joi.string(),
  regulation: Joi.array().items(Joi.string()).default([]),
  minDeposit: Joi.number().min(0),
  maxLeverage: Joi.string(),
  spreadsFrom: Joi.number().min(0),
  tradingPlatforms: Joi.array().items(Joi.string()).default([]),
  assetClasses: Joi.array().items(Joi.string()).default([]),
  paymentMethods: Joi.array().items(Joi.string()).default([]),
  customerSupport: Joi.array().items(Joi.string()).default([]),
  languages: Joi.array().items(Joi.string()).default([]),
  logo: Joi.string(),
  isFeatured: Joi.boolean(),
  isActive: Joi.boolean()
});

// Review validation schema
const reviewSchema = Joi.object({
  brokerId: Joi.string().required(),
  title: Joi.string().required(),
  content: Joi.string().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  pros: Joi.array().items(Joi.string()).default([]),
  cons: Joi.array().items(Joi.string()).default([])
});

// Export validation middleware
export const validateAuth = validate(registerSchema.or(loginSchema));
export const validateBroker = validate(brokerSchema);
export const validateReview = validate(reviewSchema);