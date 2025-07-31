import { Request, Response, NextFunction } from 'express';
import { prisma } from '../index';
import { AuthenticatedRequest, ReviewFilters } from '../types';
import { AppError } from '../middleware/errorHandler';
import { VoteType } from '@prisma/client';

// Get reviews with filtering and pagination
export const getReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      page = '1',
      limit = '10',
      brokerId,
      userId,
      minRating,
      maxRating,
      verified,
      approved = 'true',
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query as ReviewFilters;

    const pageNum = parseInt(page as string) || 1;
    const limitNum = parseInt(limit as string) || 10;
    const skip = (pageNum - 1) * limitNum;

    const where: any = {
      isApproved: approved === 'true',
      ...(brokerId && { brokerId }),
      ...(userId && { userId }),
      ...(minRating && { rating: { gte: parseInt(minRating as string) } }),
      ...(maxRating && { rating: { lte: parseInt(maxRating as string) } }),
      ...(verified === 'true' && { isVerified: true }),
      ...(verified === 'false' && { isVerified: false })
    };

    const orderBy: any = {};
    if (sortBy === 'rating') {
      orderBy.rating = sortOrder;
    } else if (sortBy === 'upvotes') {
      orderBy.upvotes = sortOrder;
    } else {
      orderBy.createdAt = sortOrder;
    }

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where,
        orderBy,
        skip,
        take: limitNum,
        include: {
          user: {
            select: {
              id: true,
              username: true,
              avatar: true
            }
          },
          broker: {
            select: {
              id: true,
              name: true,
              slug: true,
              logo: true
            }
          }
        }
      }),
      prisma.review.count({ where })
    ]);

    res.json({
      success: true,
      data: reviews,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    next(error);
  }
};

// Create review
export const createReview = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const { brokerId, title, content, rating, pros, cons } = req.body;

    // Check if broker exists
    const broker = await prisma.broker.findUnique({
      where: { id: brokerId }
    });

    if (!broker) {
      throw new AppError('Broker not found', 404);
    }

    // Check if user already reviewed this broker
    const existingReview = await prisma.review.findUnique({
      where: {
        brokerId_userId: {
          brokerId,
          userId
        }
      }
    });

    if (existingReview) {
      throw new AppError('You have already reviewed this broker', 409);
    }

    // Create review
    const review = await prisma.review.create({
      data: {
        brokerId,
        userId,
        title,
        content,
        rating,
        pros: pros || [],
        cons: cons || []
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true
          }
        },
        broker: {
          select: {
            id: true,
            name: true,
            slug: true,
            logo: true
          }
        }
      }
    });

    // Update broker's overall rating and review count
    const [avgRating, reviewCount] = await Promise.all([
      prisma.review.aggregate({
        where: { brokerId, isApproved: true },
        _avg: { rating: true }
      }),
      prisma.review.count({
        where: { brokerId, isApproved: true }
      })
    ]);

    await prisma.broker.update({
      where: { id: brokerId },
      data: {
        overallRating: avgRating._avg.rating || 0,
        totalReviews: reviewCount
      }
    });

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      data: review
    });
  } catch (error) {
    next(error);
  }
};

// Update review
export const updateReview = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    const { title, content, rating, pros, cons } = req.body;

    // Find review and check ownership
    const existingReview = await prisma.review.findUnique({
      where: { id }
    });

    if (!existingReview) {
      throw new AppError('Review not found', 404);
    }

    if (existingReview.userId !== userId) {
      throw new AppError('You can only update your own reviews', 403);
    }

    // Update review
    const review = await prisma.review.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(content && { content }),
        ...(rating && { rating }),
        ...(pros && { pros }),
        ...(cons && { cons }),
        isApproved: false // Reset approval status when edited
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true
          }
        },
        broker: {
          select: {
            id: true,
            name: true,
            slug: true,
            logo: true
          }
        }
      }
    });

    // Update broker's overall rating if rating was changed
    if (rating) {
      const [avgRating, reviewCount] = await Promise.all([
        prisma.review.aggregate({
          where: { brokerId: existingReview.brokerId, isApproved: true },
          _avg: { rating: true }
        }),
        prisma.review.count({
          where: { brokerId: existingReview.brokerId, isApproved: true }
        })
      ]);

      await prisma.broker.update({
        where: { id: existingReview.brokerId },
        data: {
          overallRating: avgRating._avg.rating || 0,
          totalReviews: reviewCount
        }
      });
    }

    res.json({
      success: true,
      message: 'Review updated successfully',
      data: review
    });
  } catch (error) {
    next(error);
  }
};

// Delete review
export const deleteReview = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    // Find review and check ownership
    const review = await prisma.review.findUnique({
      where: { id }
    });

    if (!review) {
      throw new AppError('Review not found', 404);
    }

    if (review.userId !== userId) {
      throw new AppError('You can only delete your own reviews', 403);
    }

    // Delete review
    await prisma.review.delete({
      where: { id }
    });

    // Update broker's overall rating and review count
    const [avgRating, reviewCount] = await Promise.all([
      prisma.review.aggregate({
        where: { brokerId: review.brokerId, isApproved: true },
        _avg: { rating: true }
      }),
      prisma.review.count({
        where: { brokerId: review.brokerId, isApproved: true }
      })
    ]);

    await prisma.broker.update({
      where: { id: review.brokerId },
      data: {
        overallRating: avgRating._avg.rating || 0,
        totalReviews: reviewCount
      }
    });

    res.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Vote on review
export const voteOnReview = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    const { voteType } = req.body;

    if (!Object.values(VoteType).includes(voteType)) {
      throw new AppError('Invalid vote type', 400);
    }

    // Check if review exists
    const review = await prisma.review.findUnique({
      where: { id }
    });

    if (!review) {
      throw new AppError('Review not found', 404);
    }

    // Check if user already voted
    const existingVote = await prisma.reviewVote.findUnique({
      where: {
        reviewId_userId: {
          reviewId: id,
          userId
        }
      }
    });

    if (existingVote) {
      if (existingVote.voteType === voteType) {
        // Remove vote if same type
        await prisma.reviewVote.delete({
          where: { id: existingVote.id }
        });
      } else {
        // Update vote if different type
        await prisma.reviewVote.update({
          where: { id: existingVote.id },
          data: { voteType }
        });
      }
    } else {
      // Create new vote
      await prisma.reviewVote.create({
        data: {
          reviewId: id,
          userId,
          voteType
        }
      });
    }

    // Update vote counts on review
    const [upvotes, downvotes] = await Promise.all([
      prisma.reviewVote.count({
        where: { reviewId: id, voteType: VoteType.UPVOTE }
      }),
      prisma.reviewVote.count({
        where: { reviewId: id, voteType: VoteType.DOWNVOTE }
      })
    ]);

    const updatedReview = await prisma.review.update({
      where: { id },
      data: {
        upvotes,
        downvotes
      }
    });

    res.json({
      success: true,
      message: 'Vote recorded successfully',
      data: {
        upvotes: updatedReview.upvotes,
        downvotes: updatedReview.downvotes
      }
    });
  } catch (error) {
    next(error);
  }
};