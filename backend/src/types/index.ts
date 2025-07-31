import { Request } from 'express';
import { UserRole } from '@prisma/client';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: UserRole;
  };
}

export interface PaginationQuery {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface BrokerFilters {
  search?: string;
  minDeposit?: string;
  maxDeposit?: string;
  regulation?: string[];
  tradingPlatforms?: string[];
  assetClasses?: string[];
  rating?: string;
  featured?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface BrokerSearchFilters extends PaginationQuery {
  search?: string;
  minDeposit?: number;
  maxDeposit?: number;
  regulation?: string[];
  platforms?: string[];
  assets?: string[];
  minRating?: number;
  featured?: boolean;
}

export interface ReviewFilters extends PaginationQuery {
  brokerId?: string;
  userId?: string;
  minRating?: number;
  maxRating?: number;
  verified?: boolean;
  approved?: boolean;
}

export interface CreateBrokerData {
  name: string;
  website: string;
  description?: string;
  shortDescription?: string;
  foundedYear?: number;
  headquarters?: string;
  regulation: string[];
  minDeposit?: number;
  maxLeverage?: string;
  spreadsFrom?: number;
  tradingPlatforms: string[];
  assetClasses: string[];
  paymentMethods: string[];
  customerSupport: string[];
  languages: string[];
  logo?: string;
}

export interface CreateReviewData {
  brokerId: string;
  title: string;
  content: string;
  rating: number;
  pros: string[];
  cons: string[];
}

export interface UpdateBrokerData extends Partial<CreateBrokerData> {
  isFeatured?: boolean;
  isActive?: boolean;
}

export interface JWTPayload {
  id: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}