import { Request, Response, NextFunction } from 'express';
import { prisma } from '../index';
import { AppError } from '../middleware/errorHandler';

export const getArticles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      page = '1',
      limit = '10',
      category,
      featured,
      search
    } = req.query;

    const pageNum = parseInt(page as string) || 1;
    const limitNum = parseInt(limit as string) || 10;
    const skip = (pageNum - 1) * limitNum;

    const where: any = {
      isPublished: true,
      ...(category && { category }),
      ...(featured === 'true' && { isFeatured: true }),
      ...(search && {
        OR: [
          { title: { contains: search as string, mode: 'insensitive' } },
          { content: { contains: search as string, mode: 'insensitive' } },
          { excerpt: { contains: search as string, mode: 'insensitive' } }
        ]
      })
    };

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        skip,
        take: limitNum,
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          author: true,
          coverImage: true,
          category: true,
          tags: true,
          views: true,
          createdAt: true
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.article.count({ where })
    ]);

    res.json({
      success: true,
      data: articles,
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

export const getArticleBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;

    const article = await prisma.article.findUnique({
      where: { slug }
    });

    if (!article || !article.isPublished) {
      throw new AppError('Article not found', 404);
    }

    // Increment view count
    await prisma.article.update({
      where: { id: article.id },
      data: { views: { increment: 1 } }
    });

    res.json({
      success: true,
      data: { ...article, views: article.views + 1 }
    });
  } catch (error) {
    next(error);
  }
};