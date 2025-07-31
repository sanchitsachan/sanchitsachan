import { Response, NextFunction } from 'express';
import { prisma } from '../index';
import { AuthenticatedRequest } from '../types';
import { AppError } from '../middleware/errorHandler';

export const getDashboardStats = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const [
      totalBrokers,
      totalUsers,
      totalReviews,
      pendingReviews,
      recentReviews,
      topBrokers
    ] = await Promise.all([
      prisma.broker.count({ where: { isActive: true } }),
      prisma.user.count({ where: { isActive: true } }),
      prisma.review.count({ where: { isApproved: true } }),
      prisma.review.count({ where: { isApproved: false } }),
      prisma.review.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { username: true } },
          broker: { select: { name: true } }
        }
      }),
      prisma.broker.findMany({
        take: 5,
        orderBy: { overallRating: 'desc' },
        select: {
          id: true,
          name: true,
          overallRating: true,
          totalReviews: true
        }
      })
    ]);

    res.json({
      success: true,
      data: {
        stats: {
          totalBrokers,
          totalUsers,
          totalReviews,
          pendingReviews
        },
        recentReviews,
        topBrokers
      }
    });
  } catch (error) {
    next(error);
  }
};

export const approveReview = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const review = await prisma.review.update({
      where: { id },
      data: { isApproved: true }
    });

    res.json({
      success: true,
      message: 'Review approved successfully',
      data: review
    });
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    await prisma.review.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const toggleUserStatus = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { isActive: !user.isActive }
    });

    res.json({
      success: true,
      message: `User ${updatedUser.isActive ? 'activated' : 'deactivated'} successfully`,
      data: updatedUser
    });
  } catch (error) {
    next(error);
  }
};

export const createRanking = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { brokerId, category, position, score, year, month, description } = req.body;

    const ranking = await prisma.ranking.create({
      data: {
        brokerId,
        category,
        position,
        score,
        year,
        month,
        description
      },
      include: {
        broker: { select: { name: true } }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Ranking created successfully',
      data: ranking
    });
  } catch (error) {
    next(error);
  }
};

export const updateRanking = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const ranking = await prisma.ranking.update({
      where: { id },
      data: updateData,
      include: {
        broker: { select: { name: true } }
      }
    });

    res.json({
      success: true,
      message: 'Ranking updated successfully',
      data: ranking
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRanking = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    await prisma.ranking.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Ranking deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};