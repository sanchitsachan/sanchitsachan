import { Request, Response, NextFunction } from 'express';
import { prisma } from '../index';
import { AuthenticatedRequest, BrokerSearchFilters, ApiResponse } from '../types';
import { AppError } from '../middleware/errorHandler';
import { Prisma } from '@prisma/client';

// Helper function to generate slug from name
const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Get all brokers with filtering and pagination
export const getBrokers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      page = '1',
      limit = '12',
      search,
      minDeposit,
      maxDeposit,
      regulation,
      platforms,
      assets,
      minRating,
      featured,
      sortBy = 'overallRating',
      sortOrder = 'desc'
    } = req.query as BrokerSearchFilters;

    const pageNum = parseInt(page as string) || 1;
    const limitNum = parseInt(limit as string) || 12;
    const skip = (pageNum - 1) * limitNum;

    // Build where clause
    const where: Prisma.BrokerWhereInput = {
      isActive: true,
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { headquarters: { contains: search, mode: 'insensitive' } }
        ]
      }),
      ...(minDeposit && { minDeposit: { gte: parseFloat(minDeposit as string) } }),
      ...(maxDeposit && { minDeposit: { lte: parseFloat(maxDeposit as string) } }),
      ...(regulation && { regulation: { hasSome: Array.isArray(regulation) ? regulation : [regulation] } }),
      ...(platforms && { tradingPlatforms: { hasSome: Array.isArray(platforms) ? platforms : [platforms] } }),
      ...(assets && { assetClasses: { hasSome: Array.isArray(assets) ? assets : [assets] } }),
      ...(minRating && { overallRating: { gte: parseFloat(minRating as string) } }),
      ...(featured === 'true' && { isFeatured: true })
    };

    // Build order by clause
    const orderBy: Prisma.BrokerOrderByWithRelationInput = {};
    if (sortBy === 'name') {
      orderBy.name = sortOrder as 'asc' | 'desc';
    } else if (sortBy === 'overallRating') {
      orderBy.overallRating = sortOrder as 'asc' | 'desc';
    } else if (sortBy === 'totalReviews') {
      orderBy.totalReviews = sortOrder as 'asc' | 'desc';
    } else if (sortBy === 'createdAt') {
      orderBy.createdAt = sortOrder as 'asc' | 'desc';
    }

    const [brokers, total] = await Promise.all([
      prisma.broker.findMany({
        where,
        orderBy,
        skip,
        take: limitNum,
        include: {
          _count: {
            select: { reviews: true }
          }
        }
      }),
      prisma.broker.count({ where })
    ]);

    const response: ApiResponse = {
      success: true,
      data: brokers,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum)
      }
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};

// Get broker by ID
export const getBrokerById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const broker = await prisma.broker.findUnique({
      where: { id },
      include: {
        reviews: {
          include: {
            user: {
              select: { id: true, username: true, avatar: true }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 10
        },
        rankings: {
          orderBy: [{ year: 'desc' }, { month: 'desc' }],
          take: 5
        },
        _count: {
          select: { reviews: true }
        }
      }
    });

    if (!broker) {
      throw new AppError('Broker not found', 404);
    }

    res.json({
      success: true,
      data: broker
    });
  } catch (error) {
    next(error);
  }
};

// Get broker by slug
export const getBrokerBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;

    const broker = await prisma.broker.findUnique({
      where: { slug },
      include: {
        reviews: {
          include: {
            user: {
              select: { id: true, username: true, avatar: true }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 10
        },
        rankings: {
          orderBy: [{ year: 'desc' }, { month: 'desc' }],
          take: 5
        },
        _count: {
          select: { reviews: true }
        }
      }
    });

    if (!broker) {
      throw new AppError('Broker not found', 404);
    }

    res.json({
      success: true,
      data: broker
    });
  } catch (error) {
    next(error);
  }
};

// Get featured brokers
export const getFeaturedBrokers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const brokers = await prisma.broker.findMany({
      where: {
        isActive: true,
        isFeatured: true
      },
      orderBy: {
        overallRating: 'desc'
      },
      take: 6,
      include: {
        _count: {
          select: { reviews: true }
        }
      }
    });

    res.json({
      success: true,
      data: brokers
    });
  } catch (error) {
    next(error);
  }
};

// Compare brokers
export const compareBrokers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ids } = req.query;
    
    if (!ids) {
      throw new AppError('Broker IDs are required for comparison', 400);
    }

    const brokerIds = Array.isArray(ids) ? ids : (ids as string).split(',');
    
    if (brokerIds.length < 2 || brokerIds.length > 4) {
      throw new AppError('You can compare between 2 to 4 brokers', 400);
    }

    const brokers = await prisma.broker.findMany({
      where: {
        id: { in: brokerIds },
        isActive: true
      },
      include: {
        _count: {
          select: { reviews: true }
        }
      }
    });

    if (brokers.length !== brokerIds.length) {
      throw new AppError('One or more brokers not found', 404);
    }

    res.json({
      success: true,
      data: brokers
    });
  } catch (error) {
    next(error);
  }
};

// Get broker rankings
export const getBrokerRankings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, year = new Date().getFullYear() } = req.query;

    const rankings = await prisma.ranking.findMany({
      where: {
        ...(category && { category: category as any }),
        year: parseInt(year as string)
      },
      include: {
        broker: {
          select: {
            id: true,
            name: true,
            slug: true,
            logo: true,
            overallRating: true,
            totalReviews: true
          }
        }
      },
      orderBy: {
        position: 'asc'
      }
    });

    res.json({
      success: true,
      data: rankings
    });
  } catch (error) {
    next(error);
  }
};

// Create broker (Admin only)
export const createBroker = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const brokerData = req.body;
    
    // Generate slug from name
    const slug = generateSlug(brokerData.name);
    
    // Check if slug already exists
    const existingBroker = await prisma.broker.findUnique({
      where: { slug }
    });

    if (existingBroker) {
      throw new AppError('A broker with this name already exists', 409);
    }

    const broker = await prisma.broker.create({
      data: {
        ...brokerData,
        slug,
        minDeposit: brokerData.minDeposit ? parseFloat(brokerData.minDeposit) : null,
        spreadsFrom: brokerData.spreadsFrom ? parseFloat(brokerData.spreadsFrom) : null
      }
    });

    res.status(201).json({
      success: true,
      message: 'Broker created successfully',
      data: broker
    });
  } catch (error) {
    next(error);
  }
};

// Update broker (Admin only)
export const updateBroker = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Check if broker exists
    const existingBroker = await prisma.broker.findUnique({
      where: { id }
    });

    if (!existingBroker) {
      throw new AppError('Broker not found', 404);
    }

    // If name is being updated, regenerate slug
    if (updateData.name && updateData.name !== existingBroker.name) {
      const slug = generateSlug(updateData.name);
      
      // Check if new slug conflicts with existing broker
      const slugConflict = await prisma.broker.findFirst({
        where: {
          slug,
          id: { not: id }
        }
      });

      if (slugConflict) {
        throw new AppError('A broker with this name already exists', 409);
      }

      updateData.slug = slug;
    }

    // Convert numeric strings to numbers
    if (updateData.minDeposit) {
      updateData.minDeposit = parseFloat(updateData.minDeposit);
    }
    if (updateData.spreadsFrom) {
      updateData.spreadsFrom = parseFloat(updateData.spreadsFrom);
    }

    const broker = await prisma.broker.update({
      where: { id },
      data: updateData
    });

    res.json({
      success: true,
      message: 'Broker updated successfully',
      data: broker
    });
  } catch (error) {
    next(error);
  }
};

// Delete broker (Admin only)
export const deleteBroker = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const broker = await prisma.broker.findUnique({
      where: { id }
    });

    if (!broker) {
      throw new AppError('Broker not found', 404);
    }

    await prisma.broker.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Broker deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};