import { Request, Response, NextFunction } from 'express';
import { PrismaClient, User } from '../generated/prisma';
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

interface JwtPayload {
  userId: number;
}

const getTokenFromHeader = (req: Request): string | null => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }
  return null;
};

const verifyAndDecodeToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const findValidUserById = async (userId: number): Promise<Omit<User, 'password'> | null> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, firstName: true, lastName: true, role: true, isBlocked: true }
  });
  if (!user || user.isBlocked) return null;
  return user;
};

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  const token = getTokenFromHeader(req);
  if (!token) return res.status(401).json({ message: req.t('auth.unauthorized_no_token') });
  const decoded = verifyAndDecodeToken(token);
  if (!decoded) return res.status(401).json({ message: req.t('auth.token_not_valid') });
  const user = await findValidUserById(decoded.userId);
  if (!user) return res.status(401).json({ message: req.t('auth.unauthorized') });
  req.user = user;
  next();
};
