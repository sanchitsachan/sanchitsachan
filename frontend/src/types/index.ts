// API Response types
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

// User types
export interface User {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  _count?: {
    reviews: number;
  };
}

// Broker types
export interface Broker {
  id: string;
  name: string;
  slug: string;
  logo?: string;
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
  isActive: boolean;
  isFeatured: boolean;
  overallRating: number;
  totalReviews: number;
  createdAt: string;
  updatedAt: string;
  reviews?: Review[];
  rankings?: Ranking[];
  _count?: {
    reviews: number;
  };
}

// Review types
export interface Review {
  id: string;
  brokerId: string;
  userId: string;
  title: string;
  content: string;
  rating: number;
  pros: string[];
  cons: string[];
  isVerified: boolean;
  isApproved: boolean;
  upvotes: number;
  downvotes: number;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    username: string;
    avatar?: string;
  };
  broker?: {
    id: string;
    name: string;
    slug: string;
    logo?: string;
  };
}

// Ranking types
export interface Ranking {
  id: string;
  brokerId: string;
  category: 'OVERALL' | 'SPREADS' | 'CUSTOMER_SUPPORT' | 'TRADING_PLATFORM' | 'REGULATION' | 'MOBILE_TRADING' | 'EDUCATION' | 'RESEARCH';
  position: number;
  score: number;
  year: number;
  month?: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
  broker?: {
    id: string;
    name: string;
    slug: string;
    logo?: string;
    overallRating: number;
    totalReviews: number;
  };
}

// Article types
export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  author: string;
  coverImage?: string;
  category: 'NEWS' | 'EDUCATION' | 'ANALYSIS' | 'BROKER_REVIEW' | 'TRADING_GUIDE' | 'MARKET_UPDATE';
  tags: string[];
  isPublished: boolean;
  isFeatured: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
}

// Filter types
export interface BrokerFilters {
  search?: string;
  minDeposit?: number;
  maxDeposit?: number;
  regulation?: string[];
  platforms?: string[];
  assets?: string[];
  minRating?: number;
  featured?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ReviewFilters {
  brokerId?: string;
  userId?: string;
  minRating?: number;
  maxRating?: number;
  verified?: boolean;
  approved?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface ReviewForm {
  brokerId: string;
  title: string;
  content: string;
  rating: number;
  pros: string[];
  cons: string[];
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Auth context types
export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterForm) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  isLoading: boolean;
}