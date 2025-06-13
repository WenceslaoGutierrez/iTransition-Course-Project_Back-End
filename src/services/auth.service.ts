import { PrismaClient, User } from '../generated/prisma/client';
import bcrypt from 'bcrypt';

const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

export const generateToken = (user: User) => {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '10m' });
};
